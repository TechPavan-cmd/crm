import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceDashboard = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/attendance/admin', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => setAttendance(res.data))
    .catch((err) => console.error('Failed to fetch attendance:', err));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Attendance Records</h2>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time In</th>
              <th className="p-2 border">Time Out</th>
              <th className="p-2 border">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(record => (
              <tr key={record._id}>
                <td className="p-2 border">{record.userId?.fullName}</td>
                <td className="p-2 border">{record.userId?.email}</td>
                <td className="p-2 border">{record.date}</td>
                <td className="p-2 border">{record.timeIn}</td>
                <td className="p-2 border">{record.timeOut || '-'}</td>
                <td className="p-2 border">{record.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
