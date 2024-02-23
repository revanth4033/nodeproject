const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define a Mongoose schema for booking data
const confirmBookingSchema = new mongoose.Schema({
  remainingBalance: String,
  discount: String,
  totalAmount: String,
  paidBy: String,
  contactNumber: String,
  village: String,
  paymentMethod: String,
});

// Create a Mongoose model for bookings based on the schema
const ConfirmBookingModel = mongoose.model('ConfirmBooking', confirmBookingSchema);

// Handle POST request to save booking data
router.post('/confirmBooking', async (req, res) => {
  const {
    remainingBalance,
    discount,
    totalAmount,
    paidBy,
    contactNumber,
    village,
    paymentMethod,
  } = req.body;

  try {
    const newBooking = new ConfirmBookingModel({
      remainingBalance,
      discount,
      totalAmount,
      paidBy,
      contactNumber,
      village,
      paymentMethod,
    });

    await newBooking.save();
    res.json({ success: true, message: 'Booking data saved successfully!' });
  } catch (error) {
    console.error('Error saving booking data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
