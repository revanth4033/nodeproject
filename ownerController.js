const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define a Mongoose schema for your data
const ownerSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  emailId: String,
  alternateContact: String,
});

// Create a Mongoose model based on the schema
const OwnerModel = mongoose.model('Owner', ownerSchema);

router.post('/owners', async (req, res) => {
  const { name, contactNumber, emailId, alternateContact } = req.body;

  try {
    const newOwner = new OwnerModel({
      name,
      contactNumber,
      emailId,
      alternateContact,
    });

    await newOwner.save();
    res.json({ success: true, message: 'Owner details saved successfully!' });
  } catch (error) {
    console.error('Error saving owner details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
