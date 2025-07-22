import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    // 👀 Debug logs
    console.log("Email:", trimmedEmail);
    console.log("Password:", trimmedPassword);
    console.log("Sending payload:", JSON.stringify({ email: trimmedEmail, password: trimmedPassword }));

    setLoading(true);
    try {
      const res = await fetch("https://beauty-backend-dc5m.onrender.com/api/admin-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      const data = await res.json();

      console.log("Response from backend:", data); // 🔥 Add this line too

      if (data.success || data.token) {
        setSuccess("Login successful!");
        localStorage.setItem("adminToken", data.token);
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E90000] to-[#FAA6FF]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 px-8 py-10 rounded-2xl shadow-2xl min-w-[340px] max-w-[370px] w-full"
      >
        <h2 className="mb-6 text-center text-black font-extrabold text-2xl tracking-wide">
          Admin Login
        </h2>

        <div className="mb-5">
          <label htmlFor="email" className="font-semibold text-black block mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            className="w-full px-4 py-3 mt-1 rounded-lg border-2 border-pink-200 text-black font-medium bg-pink-50 focus:border-pink-400 focus:outline-none transition"
            disabled={loading}
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="font-semibold text-black block mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 mt-1 rounded-lg border-2 border-pink-200 text-black font-medium bg-pink-50 focus:border-pink-400 focus:outline-none transition"
            disabled={loading}
            required
          />
        </div>

        {error && <div className="text-[#E90000] mb-3 font-medium">{error}</div>}
        {success && <div className="text-sky-400 mb-3 font-medium">{success}</div>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg mt-1 shadow-md tracking-wide transition disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
