const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

/* ------------------ App Configuration ------------------ */
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = 3000;
const DB_FILE = path.join(__dirname, "courses.json");

/* ------------------ Constants ------------------ */
const COURSE_LEVELS = ["beginner", "intermediate", "advanced"];

/* ------------------ Helper Functions ------------------ */

/**
 * Reads the JSON database file.
 * Returns an empty array if the file does not exist.
 */
async function readDb() {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      // File doesn't exist yet, return empty array
      return [];
    }
    throw err;
  }
}

/**
 * Writes data to the JSON database file.
 */
async function writeDb(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

/**
 * Validates course data.
 * @param {Object} data - The request body
 * @param {boolean} isUpdate - True if this is a PATCH request (partial update)
 */
const validateCourse = (data, isUpdate = false) => {
  const errors = [];

  // 1. Validate Title
  if (!isUpdate && !data.title) {
    errors.push("Title is required");
  } else if (data.title && typeof data.title !== "string") {
    errors.push("Title must be a string");
  }

  // 2. Validate Description
  if (!isUpdate && !data.description) {
    errors.push("Description is required");
  }

  // 3. Validate Level (Enum Check)
  if (data.level && !COURSE_LEVELS.includes(data.level)) {
    errors.push(`Level must be one of: ${COURSE_LEVELS.join(", ")}`);
  } else if (!isUpdate && !data.level) {
    errors.push("Course level is required");
  }

  return errors;
};

/* ------------------ Routes ------------------ */

/**
 * GET /api/courses
 * Retrieve all courses
 */
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await readDb();
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * POST /api/courses
 * Create a new course
 */
app.post("/api/courses", async (req, res) => {
  try {
    // 1. Validate Input
    const errors = validateCourse(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    // 2. Read DB
    const courses = await readDb();

    // 3. Create New Course Object
    const newCourse = {
      id: crypto.randomUUID(),
      title: req.body.title.trim(),
      description: req.body.description,
      level: req.body.level,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 4. Save
    courses.push(newCourse);
    await writeDb(courses);

    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * PATCH /api/courses/:id
 * Update an existing course
 */
app.patch("/api/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Read DB
    const courses = await readDb();

    // 2. Find Course
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Course not found" });
    }

    // 3. Validate Updates
    const errors = validateCourse(req.body, true);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }

    // 4. Update Object
    courses[index] = {
      ...courses[index], // Keep existing fields
      ...req.body,       // Overwrite with new fields
      updatedAt: new Date(),
    };

    // 5. Save
    await writeDb(courses);

    res.status(200).json(courses[index]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* ------------------ Server Start ------------------ */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Data will be saved to: ${DB_FILE}`);
});
