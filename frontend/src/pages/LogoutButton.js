import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Prevent back button after logout
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    // Redirect to login page
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
};

export default Logout;






// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const logout = async () => {
//       try {
//         await axios.post('/api/auth/logout');
//         localStorage.removeItem('token');
//         localStorage.removeItem('userRole');
//         navigate('/login');
//       } catch (err) {
//         console.error('Logout failed:', err);
//       }
//     };

//     logout();
//   }, [navigate]);

//   return null;
// };

// export default Logout;
