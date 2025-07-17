const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middleware/auth'); // make sure you have this middleware


// Mark Attendance (User)
router.post('/', authMiddleware, async (req, res) => {
  const { date, timeIn, timeOut, remarks } = req.body;
  try {
    const attendance = new Attendance({
      userId: req.user.id,
      date,
      timeIn,
      timeOut,
      remarks,
    });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

// Get All Attendance for Admin
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const records = await Attendance.find().populate('userId', 'fullName email');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// ✅ Check if attendance already submitted for a given date
router.get('/check/:date', authMiddleware, async (req, res) => {
  try {
    const existing = await Attendance.findOne({ userId: req.user.id, date: req.params.date });
    if (existing) {
      return res.json({ exists: true, attendance: existing });
    }
    res.json({ exists: false });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Delete attendance for a specific date
router.delete('/:date', authMiddleware, async (req, res) => {
  try {
    await Attendance.deleteOne({ userId: req.user.id, date: req.params.date });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
