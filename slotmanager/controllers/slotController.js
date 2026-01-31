const Slot = require("../models/Slot");

// Admin creates slot
exports.createSlot = async (req, res) => {
  const { date, startTime, endTime, capacity } = req.body;

  const slot = await Slot.create({
    date,
    startTime,
    endTime,
    capacity
  });

  res.status(201).json(slot);
};

// User checks availability
exports.getAvailableSlots = async (req, res) => {
  const { date } = req.query;

  const slots = await Slot.find({
    date,
    status: "OPEN",
    $expr: { $lt: ["$bookedCount", "$capacity"] }
  });

  res.json(slots);
};
