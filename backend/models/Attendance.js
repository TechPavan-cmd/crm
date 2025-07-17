const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, required: true },
  timeIn: { type: String, required: true },
  timeOut: { type: String },
  remarks: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
