import express from "express";
import mongoose from "mongoose";
import { validateRequest } from "./validation.js";

const router = express.Router();

// Mongoose model
const tourismVisitRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  status: { type: String, default: "pending" }
});

const TourismVisitRequest = mongoose.model("TourismVisitRequest", tourismVisitRequestSchema);

// Controller functions
export const getRequests = async (req, res) => {
  const requests = await TourismVisitRequest.find();
  res.json(requests);
};

export const createRequest = async (req, res) => {
  const valid = validateRequest(req.body);
  if (!valid) return res.status(400).json({ message: "Invalid request data" });

  const newRequest = new TourismVisitRequest(req.body);
  await newRequest.save();
  res.status(201).json(newRequest);
};

// Routes
router.get("/", getRequests);
router.post("/", createRequest);

export default router;
