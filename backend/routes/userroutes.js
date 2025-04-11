const express = require('express');
const router = express.Router();
const user = require('../models/user'); // Adjust path if needed

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await user.find(); // or filter like { role: 'client' }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
