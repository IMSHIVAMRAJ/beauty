import Beautician from "../models/Beautician.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Only Login allowed (no register)
export const loginBeautician = async (req, res) => {
  const { email, password } = req.body;

  const beautician = await Beautician.findOne({ email });
  if (!beautician) return res.status(404).json({ message: "Not found" });

  const isMatch = await bcrypt.compare(password, beautician.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: beautician._id, role: "beautician" }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(200).json({ token, beautician });
};

// ✅ Set Availability
export const setAvailability = async (req, res) => {
  const { date, timeSlots } = req.body;
  const beautician = await Beautician.findById(req.user.id);

  if (!beautician) return res.status(404).json({ message: "Beautician not found" });

  beautician.availableSlots.push({ date, timeSlots });
  await beautician.save();

  res.status(200).json({ message: "Slots updated" });
};
export const getMySlots = async (req, res) => {
  const beautician = await Beautician.findById(req.user.id);
  res.status(200).json(beautician.availableSlots);
};
// ✅ Get Own Bookings
export const getBeauticianBookings = async (req, res) => {
  const bookings = await Booking.find({ beautician: req.user.id })
    .populate("user services.service")
    .sort({ createdAt: -1 });

  res.status(200).json(bookings);
};

// ✅ Update Booking Status
export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) return res.status(404).json({ message: "Booking not found" });
  if (booking.beautician.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  booking.status = status;
  await booking.save();

  res.status(200).json({ message: "Booking updated", booking });
};

// ✅ Earnings
export const getEarnings = async (req, res) => {
  const bookings = await Booking.find({
    beautician: req.user.id,
    paymentStatus: "paid",
    status: "completed",
  });

  const total = bookings.reduce((sum, b) => sum + b.finalAmount, 0);
  res.status(200).json({ total });
};
export const addAvailableSlots = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;
    const beautician = req.beautician;

    const existing = beautician.availableSlots.find(s => s.date === date);

    if (existing) {
      existing.timeSlots = Array.from(new Set([...existing.timeSlots, ...timeSlots]));
    } else {
      beautician.availableSlots.push({ date, timeSlots });
    }

    await beautician.save();
    res.status(200).json({ message: "Slots updated", slots: beautician.availableSlots });
  } catch (error) {
    console.error("Add slot error:", error);
    res.status(500).json({ message: "Failed to add slots" });
  }
};
