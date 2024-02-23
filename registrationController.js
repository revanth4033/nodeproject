const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Define a Mongoose schema for user registration data
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});

// Create a Mongoose model for user registrations based on the schema
const UserModel = mongoose.model('User', userSchema);

// Handle POST request for user registration
router.post('/register', async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = new UserModel({
      firstName,
      lastName,
      username,
      password,
    });

    await newUser.save();
    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error saving user registration details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.get('/users/:username', async (req, res) => {
    const { username } = req.params;
  
    try {
      // Find the user based on the provided username
      const user = await UserModel.findOne({ username });
  
      if (user) {
        // Return user data if found
        res.json({ success: true, data: user });
      } else {
        // Return an error if user not found
        res.json({ success: false, error: 'User not found' });
      }
    } catch (error) {
      // Handle other errors
      console.error('Error retrieving user data:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

module.exports = router;
