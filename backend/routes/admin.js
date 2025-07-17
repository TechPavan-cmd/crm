const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST /api/admin/create-user
router.post('/create-user', async (req, res) => {
  try {
    const { fullName, email, mobile, dob, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      mobile,
      dob,
      password: hashed,
      role: role || 'user'
    });

    await newUser.save();
    res.json({ message: 'User created successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}); // exclude password if needed
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE user
router.delete('/user/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete error' });
  }
});

// PUT update role or info
router.put('/user/:id', async (req, res) => {
  try {
    const { fullName, email, mobile, dob, role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { fullName, email, mobile, dob, role });
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update error' });
  }
});

module.exports = router;
