// models/Visit.js
import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema(
  {
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
    scheduledDate: { type: Date, required: true },
    currentStatus: {
      type: String,
      enum: ["REQUESTED", "APPROVED", "COMPLETED", "CANCELLED"],
      default: "REQUESTED"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Visit", VisitSchema);
