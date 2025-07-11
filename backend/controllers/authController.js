import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import User from '../models/User.js';

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 1. Send OTP
export const sendOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    await twilioClient.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: `+91${phone}`, channel: 'sms' });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error("Twilio Error (Send OTP):", err);
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};

// 2. Verify OTP
export const verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: `+91${phone}`, code: otp });

    if (verification.status !== 'approved') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, isVerified: true });
    } else {
      user.isVerified = true;
    }

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "OTP verified & user logged in",
      token,
      user
    });

  } catch (err) {
    console.error("Twilio Error (Verify OTP):", err);
    res.status(500).json({ message: 'OTP verification failed', error: err.message });
  }
};
