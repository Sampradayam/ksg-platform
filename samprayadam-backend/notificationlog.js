import mongoose from "mongoose";

const notificationLogSchema = new mongoose.Schema({
  requestId: mongoose.Schema.Types.ObjectId,
  channel: { type: String, enum: ["EMAIL", "SMS"] },
  status: { type: String, enum: ["SUCCESS", "FAILED"] },
  errorMessage: String,
  attempt: Number
}, { timestamps: true });

export default mongoose.model("NotificationLog", notificationLogSchema);
