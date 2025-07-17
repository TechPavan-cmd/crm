// // /pages/AdminDashboard.js
// import React, { useState } from "react";
// import { FaBars, FaUser, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa";

// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`${isSidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300`}>
//         <div className="flex items-center justify-between p-4">
//           <h1 className={`text-xl font-bold text-blue-600 ${!isSidebarOpen && "hidden"}`}>Admin Panel</h1>
//           <button onClick={toggleSidebar} className="text-gray-500">
//             <FaBars />
//           </button>
//         </div>
//         <nav className="mt-6">
//           <ul className="space-y-4 px-4">
//             <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
//               <FaChartBar />
//               {isSidebarOpen && "Dashboard"}
//             </li>
//             <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
//               <FaUser />
//               {isSidebarOpen && "Manage Users"}
//             </li>
//             <li className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
//               <FaCog />
//               {isSidebarOpen && "Settings"}
//             </li>
//             <li className="flex items-center gap-3 text-gray-700 hover:text-red-500 cursor-pointer mt-10">
//               <FaSignOutAlt />
//               {isSidebarOpen && "Logout"}
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h2 className="text-3xl font-semibold mb-6 text-gray-800">Welcome, Admin!</h2>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white p-4 shadow rounded-lg">
//             <h3 className="text-xl font-bold text-gray-700">120</h3>
//             <p className="text-gray-500">Total Users</p>
//           </div>
//           <div className="bg-white p-4 shadow rounded-lg">
//             <h3 className="text-xl font-bold text-gray-700">24</h3>
//             <p className="text-gray-500">Active Services</p>
//           </div>
//           <div className="bg-white p-4 shadow rounded-lg">
//             <h3 className="text-xl font-bold text-gray-700">7</h3>
//             <p className="text-gray-500">Pending Tickets</p>
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white p-4 shadow rounded-lg">
//           <h3 className="text-lg font-semibold mb-4">Latest Users</h3>
//           <table className="w-full table-auto">
//             <thead>
//               <tr className="bg-gray-100 text-left text-gray-600">
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Email</th>
//                 <th className="p-2">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-t">
//                 <td className="p-2">Pavan Kumar</td>
//                 <td className="p-2">pavan@example.com</td>
//                 <td className="p-2">Admin</td>
//               </tr>
//               <tr className="border-t">
//                 <td className="p-2">Nikita Sharma</td>
//                 <td className="p-2">nikita@example.com</td>
//                 <td className="p-2">Client</td>
//               </tr>
//               <tr className="border-t">
//                 <td className="p-2">Ravi Yadav</td>
//                 <td className="p-2">ravi@example.com</td>
//                 <td className="p-2">User</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import React, { useState, useEffect } from 'react';
import { FaBars, FaUserShield, FaUsers, FaTasks, FaUser } from 'react-icons/fa';
import { MdDashboard, MdLogout } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AttendanceDashboard from './admin/AttendanceDashboard';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => window.history.go(1);
    if (activeTab === 'users') fetchUsers();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const [stats, setStats] = useState({
    totalClients: 0,
    activeUsers: 0,
    openTickets: 0
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/users');
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/dashboard-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  const handleEdit = (user) => {
    setUserId(user._id);
    setFullName(user.fullName);
    setEmail(user.email);
    setMobile(user.mobile);
    setDob(user.dob);
    setRole(user.role);
    setPassword('');
    setConfirmPassword('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      if (userId) {
        // UPDATE existing user
        await axios.put(`http://localhost:5000/api/auth/users/${userId}`, {
          fullName,
          email,
          mobile,
          dob,
          password,
          role,
        });
      } else {
        // CREATE new user
        await axios.post('http://localhost:5000/api/auth/add', {
          fullName,
          email,
          mobile,
          dob,
          password,
          role,
        });
      }

      // Reset form after success
      setUserId(null);
      setFullName('');
      setEmail('');
      setMobile('');
      setDob('');
      setPassword('');
      setConfirmPassword('');
      setRole('user');
      setError(null);
      fetchUsers();
    } catch (err) {
      if (err.response?.data?.includes('duplicate key')) {
        setError('Email already exists.');
      } else {
        setError('Error saving user');
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4">Welcome, Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">Total Clients</h3>
                <p className="text-3xl mt-2 text-blue-500">{stats.totalClients}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">Active Users</h3>
                <p className="text-3xl mt-2 text-green-500">{stats.activeUsers}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">Open Tickets</h3>
                <p className="text-3xl mt-2 text-red-500">{stats.openTickets}</p>
              </div>
            </div>
          </>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-extrabold text-gray-700">👤 User Management</h2>
            </div>

            <div className="bg-white border rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{userId ? '✏ Edit User' : '➕ Add New User'}</h3>
              {error && <div className="text-red-600 font-semibold">{error}</div>}

              <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 rounded border" placeholder="Full Name" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded border" placeholder="Email" />
                <input value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full p-2 rounded border" placeholder="Mobile" />
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full p-2 rounded border" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded border" placeholder="Password" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 rounded border" placeholder="Confirm Password" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 rounded border">
                  {/* <option value="admin">Admin</option> */}
                  {/* <option value="client">Client</option> */}
                  <option value="user">User</option>
                </select>
                <div className="md:col-span-2 flex gap-4 mt-2">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded shadow font-semibold">
                    {userId ? '✏ Update User' : '➕ Create User'}
                  </button>
                  {userId && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserId(null);
                        setFullName('');
                        setEmail('');
                        setMobile('');
                        setDob('');
                        setPassword('');
                        setConfirmPassword('');
                        setRole('user');
                        setError(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded shadow"
                    >
                      ✖ Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white border rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">👥 Existing Users</h3>
              <table className="min-w-full table-auto border-collapse text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="border px-4 py-2 text-left">Name</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Role</th>
                    <th className="border px-4 py-2 text-left">Mobile</th>
                    <th className="border px-4 py-2 text-left">DOB</th>
                    <th className="border px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{u.fullName}</td>
                      <td className="border px-4 py-2">{u.email}</td>
                      <td className="border px-4 py-2 capitalize">{u.role}</td>
                      <td className="border px-4 py-2">{u.mobile}</td>
                      <td className="border px-4 py-2">{u.dob}</td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => handleEdit(u)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">✏ Edit</button>
                          <button onClick={() => handleDelete(u._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">🗑 Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'attendance':
        return <AttendanceDashboard />;
      case 'admins':
        return <h2 className="text-2xl font-bold">Admins Page</h2>;
      case 'clients':
        return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-extrabold text-gray-700">👤 Client Management</h2>
            </div>

            <div className="bg-white border rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{userId ? '✏ Edit Client' : '➕ Add New Client'}</h3>
              {error && <div className="text-red-600 font-semibold">{error}</div>}

              <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 rounded border" placeholder="Full Name" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded border" placeholder="Email" />
                <input value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full p-2 rounded border" placeholder="Mobile" />
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full p-2 rounded border" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded border" placeholder="Password" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 rounded border" placeholder="Confirm Password" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 rounded border">
                  {/* <option value="admin">Admin</option> */}
                  <option value="client">Client</option>
                  {/* <option value="user">User</option> */}
                </select>
                <div className="md:col-span-2 flex gap-4 mt-2">
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded shadow font-semibold">
                    {userId ? '✏ Update Client' : '➕ Create Client'}
                  </button>
                  {userId && (
                    <button
                      type="button"
                      onClick={() => {
                        setUserId(null);
                        setFullName('');
                        setEmail('');
                        setMobile('');
                        setDob('');
                        setPassword('');
                        setConfirmPassword('');
                        setRole('client');
                        setError(null);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded shadow"
                    >
                      ✖ Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white border rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">👥 Existing Client</h3>
              <table className="min-w-full table-auto border-collapse text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="border px-4 py-2 text-left">Name</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Role</th>
                    <th className="border px-4 py-2 text-left">Mobile</th>
                    <th className="border px-4 py-2 text-left">DOB</th>
                    <th className="border px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{u.fullName}</td>
                      <td className="border px-4 py-2">{u.email}</td>
                      <td className="border px-4 py-2 capitalize">{u.role}</td>
                      <td className="border px-4 py-2">{u.mobile}</td>
                      <td className="border px-4 py-2">{u.dob}</td>
                      <td className="border px-4 py-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => handleEdit(u)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">✏ Edit</button>
                          <button onClick={() => handleDelete(u._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">🗑 Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'tasks':
        return <h2 className="text-2xl font-bold">Tasks Page</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Admin</h1>
          <FaBars className="cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <ul className="p-2">
          <li onClick={() => setActiveTab('dashboard')} className={`flex items-center p-3 rounded cursor-pointer hover:bg-gray-200 ${activeTab === 'dashboard' && 'bg-gray-200'}`}>
            <MdDashboard className="text-xl" />{sidebarOpen && <span className="ml-3">Dashboard</span>}
          </li>
          <li onClick={() => setActiveTab('attendance')} className={`flex items-center p-3 rounded cursor-pointer hover:bg-gray-200 ${activeTab === 'attendance' && 'bg-gray-200'}`}>
            <FaUser className="text-xl" />{sidebarOpen && <span className="ml-3">Attendance</span>}
          </li>
          <li onClick={() => setActiveTab('admins')} className={`flex items-center p-3 rounded cursor-pointer hover:bg-gray-200 ${activeTab === 'admins' && 'bg-gray-200'}`}>
            <FaUserShield className="text-xl" />{sidebarOpen && <span className="ml-3">Admins</span>}
          </li>
          <li onClick={() => setActiveTab('users')} className={`flex items-center p-3 rounded cursor-pointer hover:bg-gray-200 ${activeTab === 'users' && 'bg-gray-200'}`}>
            <FaUser className="text-xl" />{sidebarOpen && <span className="ml-3">Users</span>}
          </li>
          <li onClick={() => setActiveTab('clients')} className={`flex items-center p-3 rounded cursor-pointer hover:bg-gray-200 ${activeTab === 'clients' && 'bg-gray-200'}`}>
            <FaUsers className="text-xl" />{sidebarOpen && <span className="ml-3">Clients</span>}
          </li>
          <li onClick={() => setActiveTab('tasks')} className={`flex items-center p-3 rounded cursor-pointer hover:bg-gray-200 ${activeTab === 'tasks' && 'bg-gray-200'}`}>
            <FaTasks className="text-xl" />{sidebarOpen && <span className="ml-3">Tasks</span>}
          </li>
          <li onClick={handleLogout} className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer text-red-500 mt-4">
            <MdLogout className="text-xl" />{sidebarOpen && <span className="ml-3">Logout</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// import React, { useState } from 'react';
// import { FaBars, FaUserShield, FaUsers, FaTasks } from 'react-icons/fa';
// import { MdDashboard, MdLogout } from 'react-icons/md';

// const AdminDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-300">
//       {/* Sidebar */}
//       <div className={`bg-white shadow-2xl transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} overflow-hidden rounded-r-2xl`}>
//         <div className="flex items-center justify-between p-4 border-b">
//           <h1 className={`font-bold text-xl transition-opacity duration-300 ${!sidebarOpen && 'opacity-0'}`}>Admin</h1>
//           <FaBars className="cursor-pointer text-xl text-gray-600" onClick={() => setSidebarOpen(!sidebarOpen)} />
//         </div>
//         <ul className="p-2 space-y-2">
//           <li className="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
//             <MdDashboard className="text-2xl text-blue-600" />
//             {sidebarOpen && <span className="ml-3 text-gray-800 font-medium">Dashboard</span>}
//           </li>
//           <li className="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
//             <FaUserShield className="text-2xl text-purple-600" />
//             {sidebarOpen && <span className="ml-3 text-gray-800 font-medium">Admins</span>}
//           </li>
//           <li className="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
//             <FaUsers className="text-2xl text-green-600" />
//             {sidebarOpen && <span className="ml-3 text-gray-800 font-medium">Clients</span>}
//           </li>
//           <li className="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
//             <FaTasks className="text-2xl text-yellow-600" />
//             {sidebarOpen && <span className="ml-3 text-gray-800 font-medium">Tasks</span>}
//           </li>
//           <li className="flex items-center p-3 hover:bg-red-100 rounded-lg cursor-pointer text-red-500 mt-4 transition-colors">
//             <MdLogout className="text-2xl" />
//             {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-auto">
//         <h2 className="text-3xl font-extrabold text-gray-700 mb-6">👋 Welcome, Admin!</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-blue-500">
//             <h3 className="text-xl font-semibold text-gray-700">Total Clients</h3>
//             <p className="text-4xl mt-3 font-bold text-blue-600">42</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-green-500">
//             <h3 className="text-xl font-semibold text-gray-700">Active Users</h3>
//             <p className="text-4xl mt-3 font-bold text-green-600">17</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-red-500">
//             <h3 className="text-xl font-semibold text-gray-700">Open Tickets</h3>
//             <p className="text-4xl mt-3 font-bold text-red-600">5</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
