import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  user: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, default: "pending" },
}, { timestamps: true });

export default mongoose.model("Visit", visitSchema);
