const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  slot: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    default: "booked"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
