const Slot = require("../models/Slot");
const Booking = require("../models/Bookings.js");

// 1️⃣ Book a slot
exports.bookSlot = async (req, res) => { 
  const { slotId } = req.body;
  const userId = req.user.id;

  const slot = await Slot.findOneAndUpdate(
    { _id: slotId, status: "OPEN", $expr: { $lt: ["$bookedCount", "$capacity"] } },
    { $inc: { bookedCount: 1 } },
    { new: true }
  );

  if (!slot) return res.status(409).json({ message: "Slot full" });

  try {
    const booking = await Booking.create({ userId, slotId, visitDate: slot.date });

    if (slot.bookedCount === slot.capacity) {
      await Slot.updateOne({ _id: slotId }, { $set: { status: "FULL" } });
    }

    res.status(201).json(booking);
  } catch (err) {
    await Slot.updateOne({ _id: slotId }, { $inc: { bookedCount: -1 } });
    throw err;
  }
};

// 2️⃣ Update (Reschedule) booking
exports.updateBooking = async (req, res) => {
  const { newSlotId } = req.body;
  const bookingId = req.params.id;
  const userId = req.user.id;

  const booking = await Booking.findOne({ _id: bookingId, userId, status: "CONFIRMED" });
  if (!booking) return res.status(400).json({ message: "Invalid booking" });

  const newSlot = await Slot.findOneAndUpdate(
    { _id: newSlotId, status: "OPEN", $expr: { $lt: ["$bookedCount", "$capacity"] } },
    { $inc: { bookedCount: 1 } },
    { new: true }
  );

  if (!newSlot) return res.status(409).json({ message: "New slot full" });

  try {
    await Slot.updateOne({ _id: booking.slotId }, { $inc: { bookedCount: -1 }, $set: { status: "OPEN" } });

    booking.slotId = newSlotId;
    booking.visitDate = newSlot.date;
    await booking.save();

    res.json({ message: "Booking updated successfully" });
  } catch (err) {
    await Slot.updateOne({ _id: newSlotId }, { $inc: { bookedCount: -1 } });
    throw err;
  }
};

// 3️⃣ Cancel booking
exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  const booking = await Booking.findOne({ _id: bookingId, userId, status: "CONFIRMED" });
  if (!booking) return res.status(400).json({ message: "Invalid or already cancelled" });

  booking.status = "CANCELLED";
  booking.cancelledAt = new Date();
  await booking.save();

  await Slot.updateOne({ _id: booking.slotId }, { $inc: { bookedCount: -1 }, $set: { status: "OPEN" } });

  res.json({ message: "Booking cancelled successfully" });
};
