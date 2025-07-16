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

// ✅ Set Weekly Availability (NEW)
export const setWeeklyAvailability = async (req, res) => {
  const { slots } = req.body; // [{ day, startTime, endTime, isAvailable }, ...]

  try {
    const beautician = await Beautician.findById(req.user.id);
    if (!beautician) return res.status(404).json({ message: "Beautician not found" });

    beautician.availableSlots = slots;
    await beautician.save();

    res.status(200).json({ message: "Availability updated successfully", slots: beautician.availableSlots });
  } catch (error) {
    console.error("Error setting weekly availability:", error);
    res.status(500).json({ message: "Failed to update availability" });
  }
};

// ✅ Get Weekly Availability (NEW)
export const getWeeklyAvailability = async (req, res) => {
  try {
    const beautician = await Beautician.findById(req.user.id);
    if (!beautician) return res.status(404).json({ message: "Beautician not found" });

    res.status(200).json({ slots: beautician.availableSlots });
  } catch (error) {
    console.error("Error getting availability:", error);
    res.status(500).json({ message: "Failed to fetch availability" });
  }
};

// ✅ Get Own Bookings
export const getBeauticianBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ beautician: req.beautician.id }) // 👈 correct field
      .populate({ path: "user", select: "fullName phone" })
                // 👈 get name/email
      .populate({ path: "services.service", select: "name" })        // 👈 service details
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching beautician bookings:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
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
