// routes/auth.js

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'secret-key'; // प्रोड में env में रखें

// POST /api/auth/add
// नया यूज़र बनाएगा (password hashing Mongoose middleware से होगा)
router.post('/add', async (req, res) => {
  const { fullName, email, mobile, dob, password, role } = req.body;
  try {
    // User model में pre('save') middleware पासवर्ड हैश करेगा
    const newUser = new User({ fullName, email, mobile, dob, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    console.error('❌ Add user error:', err.message);
    // duplicate email या validation error
    res.status(400).json({ message: err.message });
  }
});

// GET /api/auth/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Password hide
    res.json(users);
  } catch (err) {
    console.error("❌ Failed to fetch users:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


// GET /api/auth/dashboard-stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: 'client' });
    const activeUsers = await User.countDocuments({ role: 'user' });
    
    // If you have Ticket model:
    // const openTickets = await Ticket.countDocuments({ status: 'open' });

    const openTickets = 5; // Dummy if no tickets yet

    res.json({
      totalClients,
      activeUsers,
      openTickets,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
});


// Delete user
router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Update user
router.put('/users/:id', async (req, res) => {
  const { fullName, email, mobile, dob, password, role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.fullName = fullName;
  user.email = email;
  user.mobile = mobile;
  user.dob = dob;
  user.role = role;
  if (password) user.password = password;
  await user.save();

  res.json({ message: 'User updated' });
});





// POST /api/auth/login
// Email + Password + Role के आधार पर लॉगिन
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  console.log('🔐 Login attempt:', email, role);

  try {
    // रोल मैचिंग के साथ यूज़र खोजें
    const user = await User.findOne({ email, role });
    if (!user) {
      console.log('❌ User not found or role mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // पासवर्ड वेरिफाई करें
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Incorrect password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // JWT जनरेट करें
    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET,
      { expiresIn: '1h' }
    );

    console.log('✅ Login successful');
    res.json({ token, role: user.role });
  } catch (err) {
    console.error('❌ Login server error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// router.post("/login", async (req, res) => {
//   const { email, password, role } = req.body;
//   const user = await User.findOne({ email, role });

//   if (!user) return res.status(400).json({ message: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//   const token = jwt.sign({ id: user._id, role: user.role }, "secret_key", {
//     expiresIn: "1d",
//   });

//   res.json({ token });
// });

// router.post("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out successfully" });
// });

// module.exports = router;
