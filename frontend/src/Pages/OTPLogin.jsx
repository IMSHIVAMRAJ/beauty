import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Helper to validate 10-digit phone number
function isValidPhone(value) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(value);
}

const BASE_URL = "https://beauty-backend-dc5m.onrender.com"; // change this in prod

const OTPLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isValidPhone(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      console.log("Send OTP response:", data);

      if (res.ok) {
        setSuccess(data.message || "OTP sent successfully!");
        setOtpSent(true); // ✅ Show OTP input now
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  // ✅ Verify OTP
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
      console.log("Verify OTP response:", data);

      if (data.token) {
        setSuccess("Login successful!");
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("authChange"));
        setTimeout(() => navigate("/profile"), 1000);
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E90000] to-[#FAA6FF]">
      <form
        onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
        className="bg-white/95 px-8 py-10 rounded-2xl shadow-2xl min-w-[340px] max-w-[370px] w-full"
      >
        <h2 className="mb-6 text-center text-black font-extrabold text-2xl tracking-wide">
          Login with OTP
        </h2>

        <div className="mb-5">
          <label htmlFor="phone" className="font-semibold text-black block mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 10-digit phone"
            maxLength={10}
            className="w-full px-4 py-3 mt-1 rounded-lg border-2 border-pink-200 text-black font-medium bg-pink-50 focus:border-pink-400 focus:outline-none transition"
            disabled={loading || otpSent}
            required
          />
        </div>

        {otpSent && (
          <div className="mb-5">
            <label htmlFor="otp" className="font-semibold text-black block mb-2">
              Enter OTP
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
        )}

        {error && <div className="text-[#E90000] mb-3 font-medium">{error}</div>}
        {success && <div className="text-sky-400 mb-3 font-medium">{success}</div>}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#E90000] to-[#FAA6FF] text-white rounded-lg font-bold text-lg mt-1 shadow-md tracking-wide transition disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : otpSent
            ? "Verify OTP"
            : "Send OTP"}
        </button>

        {otpSent && (
          <button
            type="button"
            onClick={() => {
              setOtpSent(false);
              setOtp("");
              setError("");
              setSuccess("");
            }}
            className="mt-4 w-full bg-none border-none text-[#E90000] underline cursor-pointer text-base font-semibold tracking-wide disabled:opacity-70"
            disabled={loading}
          >
            Change phone number
          </button>
        )}
      </form>
    </div>
  );
};

export default OTPLogin;
