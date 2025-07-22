import jwt from 'jsonwebtoken';
import axios from 'axios';
import User from '../models/User.js';

const otpStore = new Map(); // Temporary OTP store

// 1. Send OTP via Fast2SMS
export const sendOTP = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otpStore.set(phone, otp); // Store OTP in memory (in prod, use Redis or DB)

  const message = `Your OTP is ${otp}. Please do not share it with anyone.`;

  try {
    const response = await axios.post(
      'https://www.fast2sms.com/dev/bulkV2',
      {
        route: 'q',
        message,
        language: 'english',
        flash: 0,
        numbers: phone
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("Fast2SMS Response:", response.data);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error("Fast2SMS Error (Send OTP):", err.response?.data || err.message);
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};

// 2. Verify OTP
export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  if (!otpStore.has(phone)) {
    return res.status(400).json({ message: 'No OTP sent to this number or OTP expired' });
  }

  const savedOTP = otpStore.get(phone);

  if (parseInt(otp) !== savedOTP) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  otpStore.delete(phone); // Remove OTP after successful verification

  try {
    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, isVerified: true });
    } else {
      user.isVerified = true;
    }

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'OTP verified & user logged in',
      token,
      user
    });
  } catch (err) {
    console.error("User DB Error (Verify OTP):", err);
    res.status(500).json({ message: 'OTP verification failed', error: err.message });
  }
};
