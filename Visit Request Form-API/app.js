// app.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

/* =========================
   MONGOOSE MODEL
========================= */
const tourismVisitRequestSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    date: Date,
    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);

const TourismVisitRequest = mongoose.model(
  "TourismVisitRequest",
  tourismVisitRequestSchema
);

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/api/visit-requests", async (req, res) => {
  const data = await TourismVisitRequest.find();
  res.json(data);
});

app.post("/api/visit-requests", async (req, res) => {
  const { name, email, date } = req.body;

  if (!name || !email || !date) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newRequest = new TourismVisitRequest(req.body);
  await newRequest.save();

  res.status(201).json(newRequest);
});

/* =========================
   DB + SERVER START
========================= */
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/tourismDB")
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB error:", err));
