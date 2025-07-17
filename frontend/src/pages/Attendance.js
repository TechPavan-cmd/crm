// import React, { useState } from 'react';
// import axios from 'axios';

// function Attendance() {
//   const [remarks, setRemarks] = useState('');
//   const today = new Date().toISOString().split('T')[0];
//   const timeIn = new Date().toLocaleTimeString();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     try {
//       await axios.post('/api/attendance', {
//         date: today,
//         timeIn,
//         remarks
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Attendance marked!");
//     } catch (error) {
//       console.error(error);
//       alert("Error marking attendance.");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Mark Attendance</h2>
//       <form onSubmit={handleSubmit} className="space-y-3 mt-4">
//         <input type="text" value={today} disabled className="border p-2 w-full" />
//         <input type="text" value={timeIn} disabled className="border p-2 w-full" />
//         <textarea
//           value={remarks}
//           onChange={(e) => setRemarks(e.target.value)}
//           placeholder="Remarks"
//           className="border p-2 w-full"
//         ></textarea>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Attendance;
