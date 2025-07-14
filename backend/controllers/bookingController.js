import Razorpay from "razorpay";
import Booking from "../models/Booking.js";
import Beautician from "../models/Beautician.js";
import crypto from "crypto";

// 1. Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const { amount } = req.body;

  const options = {
    amount: amount * 100, // paise me
    currency: "INR",
    receipt: `receipt_order_${Math.random()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay order error:", err);
    res.status(500).json({ error: "Payment order failed" });
  }
};

// 2. Confirm Booking After Payment (No beautician assigned initially)
export const confirmBooking = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      services,
      totalAmount,
      discount,
      finalAmount,
      address,
      date,
      timeSlot,
    } = req.body;

    // Step 1: Verify Signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Step 2: Create Booking in "pending" status
    const booking = await Booking.create({
      user: req.user.id, // login middleware se user milta hai
      beautician: null, // assigned later by admin
      services,
      totalAmount,
      discount,
      finalAmount,
      address,
      date,
      timeSlot,
      status: "pending",
      paymentStatus: "paid",
      razorpay: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
    });

    res.status(201).json({
      message: "Booking created in pending state",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// 3. Get User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("services.service")
      .populate("beautician", "name email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// 4. Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};

// 5. Admin Assign Beautician to Pending Booking
export const assignBeauticianToBooking = async (req, res) => {
  const { bookingId, beauticianId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.beautician = beauticianId;
    booking.status = "confirmed";
    await booking.save();

    res.status(200).json({ message: "Beautician assigned successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign beautician", error: error.message });
  }
};
