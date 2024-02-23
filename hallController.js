const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define a Mongoose schema for hall data
const hallSchema = new mongoose.Schema({
  hallName: String,
  village: String,
  mandal: String,
  district: String,
  pincode: String,
  hallLandmark: String,
  hallCapacity: String,
  googleLocation: String,
  hallType: String,
  selectedImage: String,
});

// Create a Mongoose model for halls based on the schema
const HallModel = mongoose.model('Hall', hallSchema);

// Handle POST request to save hall data
router.post('/halls', async (req, res) => {
  const {
    hallName,
    village,
    mandal,
    district,
    pincode,
    hallLandmark,
    hallCapacity,
    googleLocation,
    hallType,
    selectedImage,
  } = req.body;

  try {
    const newHall = new HallModel({
      hallName,
      village,
      mandal,
      district,
      pincode,
      hallLandmark,
      hallCapacity,
      googleLocation,
      hallType,
      selectedImage,
    });

    await newHall.save();
    res.json({ success: true, message: 'Hall details saved successfully!' });
  } catch (error) {
    console.error('Error saving hall details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
