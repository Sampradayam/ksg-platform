const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

/* ===================================================
   1. FILE SYSTEM SETUP
=================================================== */
const DATA_FILE = path.join(__dirname, "batches.json");

// Helper: Initialize file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

/* ===================================================
   2. HELPER FUNCTIONS (Read/Write)
=================================================== */

// Read data from JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data) || [];
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
};

// Write data to JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error("Error writing file:", err);
    return false;
  }
};

const generateId = () => Math.random().toString(36).substr(2, 9);
const isValidDateRange = (start, end) => new Date(start) < new Date(end);
const isValidTimeRange = (start, end) => start < end; 
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

/* ===================================================
   3. ROUTES
=================================================== */

/**
 * [POST] Create a New Batch
 */
app.post("/batches", (req, res) => {
  try {
    const { name, startDate, endDate, daysOfWeek, startTime, endTime, capacity } = req.body;

    // --- Validation ---
    if (!name || !startDate || !endDate || !daysOfWeek || !startTime || !endTime) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res.status(400).json({ message: "Invalid time format. Use HH:mm" });
    }

    if (!isValidDateRange(startDate, endDate)) {
      return res.status(400).json({ message: "Start date must be before end date." });
    }

    if (!isValidTimeRange(startTime, endTime)) {
      return res.status(400).json({ message: "Start time must be before end time." });
    }

    // --- Load Existing Data ---
    const batches = readData();

    // --- Create New Batch ---
    const newBatch = {
      id: generateId(),
      name,
      startDate, // Stored as string in JSON
      endDate,
      daysOfWeek,
      startTime,
      endTime,
      capacity: capacity ? parseInt(capacity) : null,
      enrolledCount: 0,
      status: "active",
      createdAt: new Date().toISOString()
    };

    batches.push(newBatch);
    writeData(batches); // Save to file

    res.status(201).json(newBatch);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

/**
 * [GET] List All Batches
 */
app.get("/batches", (req, res) => {
  const batches = readData();
  res.json(batches);
});

/**
 * [GET] Get Single Batch
 */
app.get("/batches/:id", (req, res) => {
  const batches = readData();
  const batch = batches.find(b => b.id === req.params.id);
  
  if (!batch) return res.status(404).json({ message: "Batch not found" });
  res.json(batch);
});

/**
 * [PUT] Update Batch
 */
app.put("/batches/:id", (req, res) => {
  const batches = readData();
  const batchIndex = batches.findIndex(b => b.id === req.params.id);
  
  if (batchIndex === -1) {
    return res.status(404).json({ message: "Batch not found" });
  }

  const currentBatch = batches[batchIndex];
  const updates = req.body;

  // Security checks
  if (updates.id || updates.enrolledCount !== undefined) {
    return res.status(403).json({ message: "Cannot manually update ID or enrolled count." });
  }

  // Merge updates
  const updatedBatch = { ...currentBatch, ...updates };

  // Validate Logic
  if (updates.startDate || updates.endDate) {
    if (!isValidDateRange(updatedBatch.startDate, updatedBatch.endDate)) {
      return res.status(400).json({ message: "Invalid date range." });
    }
  }
  
  if (updates.startTime || updates.endTime) {
    if (!isValidTimeRange(updatedBatch.startTime, updatedBatch.endTime)) {
      return res.status(400).json({ message: "Invalid time range." });
    }
  }

  if (updatedBatch.capacity !== null && updatedBatch.enrolledCount > updatedBatch.capacity) {
     return res.status(409).json({ message: "New capacity cannot be less than current enrollment." });
  }

  // Save changes
  batches[batchIndex] = updatedBatch;
  writeData(batches);

  res.json(updatedBatch);
});

/**
 * [GET] Check Availability
 */
app.get("/batches/:id/availability", (req, res) => {
  const batches = readData();
  const batch = batches.find(b => b.id === req.params.id);
  
  if (!batch) return res.status(404).json({ message: "Batch not found" });

  const isUnlimited = batch.capacity === null;
  const slotsLeft = isUnlimited ? null : (batch.capacity - batch.enrolledCount);
  const isAvailable = batch.status === "active" && (isUnlimited || slotsLeft > 0);

  res.json({
    batchId: batch.id,
    status: batch.status,
    isAvailable,
    capacity: isUnlimited ? "Unlimited" : batch.capacity,
    enrolled: batch.enrolledCount,
    slotsLeft: isUnlimited ? "Unlimited" : Math.max(0, slotsLeft)
  });
});

/**
 * [POST] Enroll User
 */
app.post("/batches/:id/enroll", (req, res) => {
  // 1. Read fresh data
  const batches = readData();
  const batchIndex = batches.findIndex(b => b.id === req.params.id);

  if (batchIndex === -1) {
    return res.status(404).json({ message: "Batch not found" });
  }

  const batch = batches[batchIndex];

  // 2. Validate availability
  if (batch.status !== "active") {
    return res.status(400).json({ message: "Batch is inactive" });
  }

  if (batch.capacity !== null && batch.enrolledCount >= batch.capacity) {
    return res.status(409).json({ message: "Batch is fully booked" });
  }

  // 3. Modify data
  batch.enrolledCount += 1;

  // 4. Write back to file
  // Important: We overwrite the specific index in the array we loaded
  batches[batchIndex] = batch;
  writeData(batches);

  res.json({ 
    message: "Enrollment Successful", 
    currentEnrollment: batch.enrolledCount 
  });
});

/* ===================================================
   4. SERVER START
=================================================== */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📂 Data is being stored in: ${DATA_FILE}`);
});
