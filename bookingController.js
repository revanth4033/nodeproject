const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define a Mongoose schema for booking data
const bookingSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  village: String,
  date: String,
});

// Create a Mongoose model for bookings based on the schema
const BookingModel = mongoose.model('Booking', bookingSchema);

// Handle POST request for bookings
router.post('/bookings', async (req, res) => {
  const { name, contactNumber, village, date } = req.body;

  try {
    const newBooking = new BookingModel({
      name,
      contactNumber,
      village,
      date,
    });

    await newBooking.save();
    res.json({ success: true, message: 'Booking details saved successfully!' });
  } catch (error) {
    console.error('Error saving booking details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
