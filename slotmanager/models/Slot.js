const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true }, // YYYY-MM-DD
    startTime: { type: String, required: true }, // HH:mm
    endTime: { type: String, required: true },
    capacity: { type: Number, required: true },
    bookedCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["OPEN", "FULL", "CLOSED"],
      default: "OPEN"
    }
  },
  { timestamps: true }
);

// Index for fast availability search
slotSchema.index({ date: 1, status: 1 });

module.exports = mongoose.model("Slot", slotSchema);
