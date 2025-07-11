import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const OTPVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!/^\d{4,6}$/.test(otp)) {
      setError("Please enter a valid OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Login successful!");
        localStorage.setItem("token", data.token);
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setResendLoading(true);
    setResendSuccess("");
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setResendSuccess("OTP resent successfully!");
      } else {
        setError(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setResendLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E90000] to-[#FAA6FF]">
      <form
        onSubmit={handleVerifyOtp}
        className="bg-white/95 px-8 py-10 rounded-2xl shadow-2xl min-w-[340px] max-w-[370px] w-full"
      >
        <h2 className="mb-6 text-center text-black font-extrabold text-2xl tracking-wide">
          Verify OTP
        </h2>
        <div className="mb-5">
          <label htmlFor="otp" className="font-semibold text-black block mb-2">
            Enter OTP sent to {phone}
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            maxLength={6}
            className="w-full px-4 py-3 mt-1 rounded-lg border-2 border-pink-200 text-black font-medium bg-pink-50 focus:border-pink-400 focus:outline-none transition"
            disabled={loading}
            required
          />
        </div>
        {error && <div className="text-[#E90000] mb-3 font-medium">{error}</div>}
        {success && <div className="text-sky-400 mb-3 font-medium">{success}</div>}
        {resendSuccess && <div className="text-green-600 mb-3 font-medium">{resendSuccess}</div>}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg mt-1 shadow-md tracking-wide transition disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Verify OTP"}
        </button>
        <button
          type="button"
          onClick={handleResendOtp}
          className="mt-4 w-full bg-none border border-pink-300 text-[#E90000] rounded-lg py-2 font-semibold tracking-wide disabled:opacity-70"
          disabled={resendLoading}
        >
          {resendLoading ? "Resending..." : "Resend OTP"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/otp-login")}
          className="mt-4 w-full bg-none border-none text-[#E90000] underline cursor-pointer text-base font-semibold tracking-wide"
          disabled={loading}
        >
          Change phone number
        </button>
      </form>
    </div>
  );
};

export default OTPVerify; 