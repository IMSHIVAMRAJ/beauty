import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BeauticianLogin = () => {
  const [identifier, setIdentifier] = useState(""); // phone or email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!identifier || !password) {
      setError("Please enter your phone/email and password.");
      return;
    }
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setSuccess("Login successful!");
      setLoading(false);
      // Store beautician data in localStorage
      localStorage.setItem('beauticianToken', 'mock-token');
      localStorage.setItem('beauticianData', JSON.stringify({
        id: 'beautician-1',
        name: 'Beautician',
        email: identifier
      }));
      setTimeout(() => navigate("/beautician/dashboard"), 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E90000] to-[#FAA6FF]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 px-8 py-10 rounded-2xl shadow-2xl min-w-[340px] max-w-[370px] w-full"
      >
        <h2 className="mb-6 text-center text-black font-extrabold text-2xl tracking-wide">
          Beautician Login
        </h2>
        <div className="mb-5">
          <label htmlFor="identifier" className="font-semibold text-black block mb-2">Phone or Email</label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            placeholder="Enter phone or email"
            className="w-full px-4 py-3 mt-1 rounded-lg border-2 border-pink-200 text-black font-medium bg-pink-50 focus:border-pink-400 focus:outline-none transition"
            disabled={loading}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="font-semibold text-black block mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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

export default BeauticianLogin; 