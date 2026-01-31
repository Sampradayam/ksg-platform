const express = require("express");
const router = express.Router();

const slotCtrl = require("../controllers/slotController");
const bookingCtrl = require("../controllers/bookingController");

// Admin
router.post("/admin/slots", slotCtrl.createSlot);

// Public
router.get("/slots", slotCtrl.getAvailableSlots);

// User
router.post("/bookings", bookingCtrl.bookSlot);
router.post("/bookings/:id/cancel", bookingCtrl.cancelBooking);

module.exports = router;
