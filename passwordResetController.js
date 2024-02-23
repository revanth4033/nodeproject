const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const PasswordReset = mongoose.model('PasswordReset', {
  newPassword: String,
});
router.get('/latestReset', async (req, res) => {
    try {
      // Find the latest password reset data (you may need to adjust the sorting criteria based on your needs)
      const latestReset = await PasswordReset.findOne().sort({ _id: -1 });
  
      if (!latestReset) {
        return res.status(404).json({ success: false, error: 'No password reset data found' });
      }
  
      return res.status(200).json({ success: true, data: latestReset });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

router.post('/resetPassword', async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, error: 'New Password and Confirm Password must match' });
  }

  try {
    await PasswordReset.create({ newPassword });

    // In a real-world scenario, you might want to send an email to the user with a password reset link

    return res.status(200).json({ success: true, message: 'Password reset initiated successfully!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
