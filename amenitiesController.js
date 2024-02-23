const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define a Mongoose schema for amenity data
const amenitySchema = new mongoose.Schema({
  stage: Boolean,
  chairsTables: Boolean,
  water: Boolean,
  cookingItems: Boolean,
  music: Boolean,
});

// Create a Mongoose model for amenities based on the schema
const AmenityModel = mongoose.model('Amenity', amenitySchema);

// Handle POST request to save amenity data
router.post('/amenities', async (req, res) => {
  const {
    stage,
    chairsTables,
    water,
    cookingItems,
    music,
  } = req.body;

  try {
    const newAmenities = new AmenityModel({
      stage,
      chairsTables,
      water,
      cookingItems,
      music,
    });

    await newAmenities.save();
    res.json({ success: true, message: 'Selected amenities saved successfully!' });
  } catch (error) {
    console.error('Error saving selected amenities:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
