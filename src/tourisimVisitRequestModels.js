// src/models/tourismVisitRequest.model.js
import mongoose from "mongoose";

const tourismVisitRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    preferredVisitDate: {
      type: Date,
      required: true,
    },
    groupSize: {
      type: Number,
      required: true,
      min: 1,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      immutable: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "TourismVisitRequest",
  tourismVisitRequestSchema
);
