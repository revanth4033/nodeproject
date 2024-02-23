const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define a Mongoose schema for cancellation data
const cancellationSchema = new mongoose.Schema({
  reason: String,
});

// Create a Mongoose model for cancellations based on the schema
const CancellationModel = mongoose.model('Cancellation', cancellationSchema);

// Handle POST request for cancellations
router.post('/cancellations', async (req, res) => {
  const { reason } = req.body;

  try {
    const newCancellation = new CancellationModel({
      reason,
    });

    await newCancellation.save();
    res.json({ success: true, message: 'Booking cancelled successfully!' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router; 