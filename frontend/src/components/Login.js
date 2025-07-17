import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Login API
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      });

      const { token } = res.data;

      // Step 2: Save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Step 3: Mark attendance automatically after login
      const currentTime = new Date().toTimeString().slice(0, 5); // HH:MM
      const today = new Date().toISOString().split("T")[0];

      await axios.post(
        "http://localhost:5000/api/attendance",
        {
          date: today,
          timeIn: currentTime,
          workType: "Office", // default
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Step 4: Redirect based on role
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "client") navigate("/client", { replace: true });
      else if (role === "user") navigate("/user", { replace: true });

    } catch (err) {
      Swal.fire(err.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    // Prevent back after login
    if (localStorage.getItem("token")) {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.go(1);
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          CRM Login
        </h2>

        <label className="block text-sm font-medium mb-1">Select Role</label>
        <select
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="client">Client</option>
          <option value="user">User</option>
        </select>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full mb-6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
