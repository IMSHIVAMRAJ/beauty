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
// ✅ Get all beauticians with their availability
export const getAllBeauticianslot = async (req, res) => {
  try {
    const beauticians = await Beautician.find({}, "name email phone availableSlots");

    res.status(200).json({ beauticians });
  } catch (err) {
    console.error("Failed to fetch beauticians:", err);
    res.status(500).json({ message: "Server error" });
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
  const { city, state } = req.body;

  if (!city || !state) {
    return res.status(400).json({ message: "City and state are required" });
  }

  try {
    const exists = await Location.findOne({ city });
    if (exists) {
      return res.status(400).json({ message: "Location already exists" });
    }

    const location = await Location.create({ city, state });
    res.status(201).json({ message: "Location added", location });
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ message: "Server error" });
  }
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
export const approveBookingAndAssignBeautician = async (req, res) => {
  try {
    const { beauticianId } = req.body;
    const bookingId = req.params.id;

    // Step 1: Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Step 2: Find the beautician
    const beautician = await Beautician.findById(beauticianId);
    if (!beautician) return res.status(404).json({ message: "Beautician not found" });

    // Step 3: Assign and approve
    booking.status = "approved";
    booking.beautician = beauticianId;
    await booking.save();

    // Step 4: Re-fetch the updated booking with beautician populated
    const updatedBooking = await Booking.findById(bookingId).populate("beautician", "name email phone");

    res.status(200).json({
      message: "Booking approved and beautician assigned",
      booking: updatedBooking,
    });
  } catch (err) {
    console.error("Admin assign error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
  const bookings = await Booking.find()
  .populate("user", "name email phone")
  .populate("beautician", "name email phone")
  .populate({
    path: "services.service",
    model: "Service",
    select: "name"
  })
  .sort({ createdAt: -1 });



    res.status(200).json(bookings);
  } catch (err) {
    console.error("Get all bookings error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
