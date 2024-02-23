const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define a Mongoose schema for hall and owner details
const hallAndOwnerSchema = new mongoose.Schema({
  hallName: String,
  village: String,
  mandal: String,
  dist: String,
  pincode: String,
  hallLandmark: String,
  hallCapacity: String,
  googleLocation: String,
  // Add more fields as needed
  ownerName: String,
  contactNumber: String,
  emailId: String,
  alternateContactNumber: String,
});

// Create a Mongoose model for hall and owner details based on the schema
const HallAndOwnerModel = mongoose.model('HallAndOwner', hallAndOwnerSchema);

// Handle POST request for saving modified hall and owner details
router.post('/modifyHallAndOwner', async (req, res) => {
  const {
    editHallName,
    editVillage,
    editMandal,
    editDist,
    editPincode,
    editHallLandmark,
    editHallCapacity,
    editGoogleLocation,
    // Add more fields as needed
    editOwnerName,
    editContactNumber,
    editEmailId,
    editAlternateContactNumber,
  } = req.body;

  try {
    const modifiedDetails = new HallAndOwnerModel({
      hallName: editHallName,
      village: editVillage,
      mandal: editMandal,
      dist: editDist,
      pincode: editPincode,
      hallLandmark: editHallLandmark,
      hallCapacity: editHallCapacity,
      googleLocation: editGoogleLocation,
      // Add more fields as needed
      ownerName: editOwnerName,
      contactNumber: editContactNumber,
      emailId: editEmailId,
      alternateContactNumber: editAlternateContactNumber,
    });

    await modifiedDetails.save();
    res.json({ success: true, message: 'Hall and owner details saved successfully!' });
  } catch (error) {
    console.error('Error saving hall and owner details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
