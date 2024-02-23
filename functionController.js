const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define a Mongoose schema for function data
const functionSchema = new mongoose.Schema({
  type: String,
  powerBill: String,
  housekeeping: String,
  decoration: String,
});

// Create a Mongoose model for functions based on the schema
const FunctionModel = mongoose.model('Function', functionSchema);

// Handle POST request for functions
router.post('/functions', async (req, res) => {
  const { type, powerBill, housekeeping, decoration } = req.body;

  try {
    const newFunction = new FunctionModel({
      type,
      powerBill,
      housekeeping,
      decoration,
    });

    await newFunction.save();
    res.json({ success: true, message: 'Function details saved successfully!' });
  } catch (error) {
    console.error('Error saving function details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
