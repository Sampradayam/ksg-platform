import mongoose from "mongoose";

const visitorRequestSchema = new mongoose.Schema({
  visitorId: String,
  email: String,
  phone: String,
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  }
}, { timestamps: true });

export default mongoose.model("VisitorRequest", visitorRequestSchema);
