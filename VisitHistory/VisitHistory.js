// models/VisitHistory.js
import mongoose from "mongoose";

const VisitHistorySchema = new mongoose.Schema(
  {
    visitId: { type: mongoose.Schema.Types.ObjectId, ref: "Visit", required: true, index: true },
    touristId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    status: {
      type: String,
      enum: ["REQUESTED", "APPROVED", "COMPLETED", "CANCELLED"],
      required: true
    },
    changedAt: { type: Date, default: Date.now },
    actor: {
      type: {
        type: String,
        enum: ["ADMIN", "SYSTEM"],
        required: true
      },
      id: { type: mongoose.Schema.Types.ObjectId, default: null }
    },
    reason: { type: String },
    metadata: {
      ipAddress: String,
      userAgent: String
    }
  },
  { versionKey: false }
);

export default mongoose.model("VisitHistory", VisitHistorySchema);
