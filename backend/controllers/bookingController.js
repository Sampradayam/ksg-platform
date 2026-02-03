import Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
  const {
    name,
    age,
    gender,
    email,
    phone,
    city,
    state,
    preferredStartDate,
    numberOfGuests,
    accommodationRequired,
    notes,
  } = req.body;

  if (
    !name ||
    !age ||
    !gender ||
    !email ||
    !phone ||
    !city ||
    !state ||
    !preferredStartDate ||
    !numberOfGuests
  ) {
    res.status(400).json({ message: "Please fill all required fields." });
    return;
  }

  try {
    const booking = await Booking.create({
      name,
      age,
      gender,
      email,
      phone,
      city,
      state,
      preferredStartDate,
      numberOfGuests,
      accommodationRequired: Boolean(accommodationRequired),
      notes,
    });

    res.status(201).json({
      message: "Booking request submitted successfully.",
      bookingId: booking._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
