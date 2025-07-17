import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const markLogoutTime = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const today = new Date().toISOString().split("T")[0];
        const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM"

        await axios.patch(
          "http://localhost:5000/api/attendance/logout",
          { date: today, timeOut: currentTime },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Logout time marking failed:", err.message);
      }
    };

    const performLogout = async () => {
      await markLogoutTime();

      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // Disable back button
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => window.history.go(1);

      // Redirect to login
      navigate("/login", { replace: true });
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;
