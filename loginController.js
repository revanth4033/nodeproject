const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define a Mongoose schema for login data
const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create a Mongoose model for logins based on the schema
const LoginModel = mongoose.model('Login', loginSchema);

// Handle POST request for logins
router.post('/logins', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newLogin = new LoginModel({
      username,
      password,
    });

    await newLogin.save();
    res.json({ success: true, message: 'Login details saved successfully!' });
  } catch (error) {
    console.error('Error saving login details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
