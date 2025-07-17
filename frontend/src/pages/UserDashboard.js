// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // ✅ Add this
// import { FaBars, FaTasks, FaUserAlt, FaRegChartBar } from 'react-icons/fa';
// import { MdDashboard, MdLogout } from 'react-icons/md';

// const UserDashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const navigate = useNavigate(); // ✅ React Router navigation


//   useEffect(() => {
//     window.history.pushState(null, null, window.location.href);
//     window.onpopstate = () => {
//       window.history.go(1);
//     };
//   }, []);



//   // ✅ Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // or any stored user/session data
//     localStorage.removeItem('userRole');
//     navigate('/login'); // Redirect to login
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
//         <div className="flex items-center justify-between p-4 border-b">
//           <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>User</h1>
//           <FaBars className="cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
//         </div>
//         <ul className="p-2">
//           <li className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer">
//             <MdDashboard className="text-xl" />
//             {sidebarOpen && <span className="ml-3">Dashboard</span>}
//           </li>
//           <li className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer">
//             <FaTasks className="text-xl" />
//             {sidebarOpen && <span className="ml-3">My Tasks</span>}
//           </li>
//           <li className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer">
//             <FaUserAlt className="text-xl" />
//             {sidebarOpen && <span className="ml-3">Profile</span>}
//           </li>
//           <li className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer">
//             <FaRegChartBar className="text-xl" />
//             {sidebarOpen && <span className="ml-3">Progress</span>}
//           </li>

//           {/* ✅ LOGOUT BUTTON */}
//           <li
//   onClick={() => {
//     localStorage.removeItem('token'); // या आपकी auth key
//     window.location.href = "/"; // "/" यानी login या home page
//   }}
//   className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer text-red-500 mt-4"
// >
//   <MdLogout className="text-xl" />
//   {sidebarOpen && <span className="ml-3">Logout</span>}
// </li>

//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h2 className="text-2xl font-bold mb-4">Welcome, User</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold text-lg">Tasks Assigned</h3>
//             <p className="text-3xl mt-2 text-blue-500">12</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold text-lg">Completed Tasks</h3>
//             <p className="text-3xl mt-2 text-green-500">8</p>
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-semibold text-lg">Pending Reviews</h3>
//             <p className="text-3xl mt-2 text-yellow-500">4</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect } from 'react';
import { FaBars, FaUser, FaTasks, FaLifeRing, FaClock } from 'react-icons/fa';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import MarkAttendance from './user/MarkAttendance';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const navigate = useNavigate();

  // Prevent back navigation after login
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Dynamic page content
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg">Active Projects</h3>
              <p className="text-3xl mt-2 text-blue-500">3</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg">Completed Tasks</h3>
              <p className="text-3xl mt-2 text-green-500">12</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg">Support Tickets</h3>
              <p className="text-3xl mt-2 text-red-500">1</p>
            </div>
          </div>
        );
      case 'profile':
        return <div className="bg-white p-6 rounded shadow">User Profile Page</div>;
      case 'markattendance':
        return <MarkAttendance/>;
      case 'tasks':
        return <div className="bg-white p-6 rounded shadow">Your Tasks Page</div>;
      case 'support':
        return <div className="bg-white p-6 rounded shadow">Support Page</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>User</h1>
          <FaBars className="cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <ul className="p-2">
          <li
            onClick={() => setActivePage('dashboard')}
            className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer"
          >
            <MdDashboard className="text-xl" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </li>
          <li
            onClick={() => setActivePage('profile')}
            className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer"
          >
            <FaUser className="text-xl" />
            {sidebarOpen && <span className="ml-3">Profile</span>}
          </li>
          <li
            onClick={() => setActivePage('tasks')}
            className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer"
          >
            <FaTasks className="text-xl" />
            {sidebarOpen && <span className="ml-3">Tasks</span>}
          </li>

          <li
            onClick={() => setActivePage('markattendance')}
            className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer"
          >
            <FaTasks className="text-xl" />
            {sidebarOpen && <span className="ml-3">MarkAttendance</span>}
          </li>

          {/* <li onClick={() => setActivePage('markattendance')} className="flex items-center p-3 cursor-pointer hover:bg-blue-100 rounded">
  <FaClock className="text-lg" />
  <span className="ml-2">Mark Attendance</span>
</li> */}

          <li
            onClick={() => setActivePage('support')}
            className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer"
          >
            <FaLifeRing className="text-xl" />
            {sidebarOpen && <span className="ml-3">Support</span>}
          </li>
          <li
            onClick={handleLogout}
            className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer text-red-500 mt-4"
          >
            <MdLogout className="text-xl" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, User</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
