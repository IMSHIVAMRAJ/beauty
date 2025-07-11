import bcrypt from "bcryptjs";
import Beautician from "../models/Beautician.js";
import Location from "../models/Location.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Coupon from "../models/Coupon.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const adminAddBeautician = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check for existing beautician
    const exists = await Beautician.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Beautician already exists" });

    // Upload image if provided
    let profileImage = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, "beauticians");
      profileImage = result.secure_url;
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create beautician
    const beautician = await Beautician.create({
      name,
      email,
      phone,
      password: hashed,
      profileImage,
    });

    res
      .status(201)
      .json({ message: "Beautician created by admin", beautician });
  } catch (err) {
    console.error("Beautician creation error:", err);
    res.status(500).json({ message: "Server error while creating beautician" });
  }
};
export const addBeauticianSlot = async (req, res) => {
  try {
    const beauticianId = req.params.id;
    const { date, timeSlots } = req.body;

    const beautician = await Beautician.findById(beauticianId);
    if (!beautician) {
      return res.status(404).json({ message: "Beautician not found" });
    }

    // Add slot (or merge if date already exists)
    const existingDate = beautician.availableSlots.find(slot => slot.date === date);
    if (existingDate) {
      existingDate.timeSlots.push(...timeSlots);
    } else {
      beautician.availableSlots.push({ date, timeSlots });
    }

    await beautician.save();

    res.status(200).json({ message: "Slot added successfully", slots: beautician.availableSlots });
  } catch (err) {
    console.error("Slot add error:", err);
    res.status(500).json({ message: "Error adding slot" });
  }
};
export const getAllBeauticians = async (req, res) => {
  const beauticians = await Beautician.find().select("-password");
  res.status(200).json(beauticians);
};

export const deleteBeautician = async (req, res) => {
  await Beautician.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Beautician deleted" });
};

export const addLocation = async (req, res) => {
  const { city } = req.body;

  const exists = await Location.findOne({ city });
  if (exists)
    return res.status(400).json({ message: "Location already exists" });

  const location = await Location.create({ city });
  res.status(201).json({ message: "Location added", location });
};

export const getLocations = async (req, res) => {
  const locations = await Location.find();
  res.status(200).json(locations);
};

export const toggleLocationStatus = async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (!location) return res.status(404).json({ message: "Location not found" });

  location.isActive = !location.isActive;
  await location.save();
  res.status(200).json({ message: "Location status updated", location });
};
export const getAdminDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalBeauticians = await Beautician.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const completedBookings = await Booking.countDocuments({
    status: "completed",
  });

  const totalRevenue = await Booking.aggregate([
    { $match: { paymentStatus: "paid" } },
    { $group: { _id: null, total: { $sum: "$finalAmount" } } },
  ]);

  res.status(200).json({
    totalUsers,
    totalBeauticians,
    totalBookings,
    completedBookings,
    totalRevenue: totalRevenue[0]?.total || 0,
  });
};

export const addCoupon = async (req, res) => {
  const { code, discountPercent, expiryDate } = req.body;

  const exists = await Coupon.findOne({ code });
  if (exists) return res.status(400).json({ message: "Coupon already exists" });

  const coupon = await Coupon.create({ code, discountPercent, expiryDate });
  res.status(201).json({ message: "Coupon created", coupon });
};

export const getCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  res.status(200).json(coupons);
};

export const toggleCouponStatus = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return res.status(404).json({ message: "Coupon not found" });

  coupon.isActive = !coupon.isActive;
  await coupon.save();
  res.status(200).json({ message: "Coupon status updated", coupon });
};
