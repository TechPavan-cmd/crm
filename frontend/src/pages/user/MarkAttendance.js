import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarkAttendance = () => {
  const [date, setDate] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [remarks, setRemarks] = useState('');
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    checkAttendance(today);
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // returns "HH:MM"
  };

  const checkAttendance = async (today) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/attendance/check/${today}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.exists) {
        setAlreadySubmitted(true);
        setTimeIn(res.data.attendance.timeIn || '');
        setRemarks(res.data.attendance.remarks || '');
      } else {
        // If not submitted yet, set timeIn to current time
        const now = getCurrentTime();
        setTimeIn(now);
      }
    } catch (err) {
      toast.error('❌ Failed to fetch attendance');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!alreadySubmitted) {
        // Submit Time In
        await axios.post(
          'http://localhost:5000/api/attendance',
          { date, timeIn, remarks },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('✅ Login Time (Time In) Saved!');
        setAlreadySubmitted(true);
      } else {
        // Update with Time Out
        const now = getCurrentTime();
        await axios.post(
          'http://localhost:5000/api/attendance',
          { date, timeIn, timeOut: now, remarks },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('✅ Logout Time (Time Out) Saved!');
        setTimeOut(now);
      }
    } catch (err) {
      toast.error('❌ Failed to submit attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-6">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-center mb-4">📝 Daily Attendance</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              value={date}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Time In</label>
            <input
              type="text"
              value={timeIn}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {alreadySubmitted && (
            <div>
              <label className="block font-medium">Time Out</label>
              <input
                type="text"
                value={timeOut}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>
          )}

          <div>
            <label className="block font-medium">Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Any comments..."
              rows={2}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading
              ? 'Saving...'
              : alreadySubmitted
              ? '📤 Save Logout Time'
              : '🕒 Mark Login Time'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarkAttendance;
