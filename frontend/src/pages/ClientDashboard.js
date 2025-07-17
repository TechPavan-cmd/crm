import React, { useState , useEffect } from 'react';
import { FaBars, FaProjectDiagram, FaHeadset, FaFileAlt } from 'react-icons/fa';
import { MdDashboard, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const ClientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

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


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>Client</h1>
          <FaBars className="cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <ul className="p-2">
          <li className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer">
            <MdDashboard className="text-xl" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </li>
          <li className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer">
            <FaProjectDiagram className="text-xl" />
            {sidebarOpen && <span className="ml-3">Projects</span>}
          </li>
          <li className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer">
            <FaHeadset className="text-xl" />
            {sidebarOpen && <span className="ml-3">Support</span>}
          </li>
          <li className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer">
            <FaFileAlt className="text-xl" />
            {sidebarOpen && <span className="ml-3">Reports</span>}
          </li>
           <li
            onClick={() => {
              localStorage.removeItem('token'); // या आपकी auth key
              window.location.href = "/"; // "/" यानी login या home page
            }}
            className="flex items-center p-3 hover:bg-gray-200 rounded cursor-pointer text-red-500 mt-4"
          >
            <MdLogout className="text-xl" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, Client</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg">Ongoing Projects</h3>
            <p className="text-3xl mt-2 text-blue-500">3</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg">Open Support Tickets</h3>
            <p className="text-3xl mt-2 text-yellow-500">2</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-lg">Monthly Reports</h3>
            <p className="text-3xl mt-2 text-green-500">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
