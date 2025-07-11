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
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order_${Math.random()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: "Payment order failed" });
  }
};

// 2. Confirm Booking After Payment & Auto Assign Beautician
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

    // ✅ Step 1: Verify Signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // ✅ Step 2: Find Available Beautician
    const beauticians = await Beautician.find({
      availableSlots: {
        $elemMatch: {
          date,
          timeSlots: timeSlot,
        },
      },
    });

    if (!beauticians.length) {
      return res
        .status(400)
        .json({ message: "No beautician available at this slot" });
    }

    const assignedBeautician = beauticians[0];

    // ✅ Step 3: Remove slot from beautician
    const slotObj = assignedBeautician.availableSlots.find(
      (s) => s.date === date
    );
    slotObj.timeSlots = slotObj.timeSlots.filter((t) => t !== timeSlot);

    await assignedBeautician.save();

    // ✅ Step 4: Create Booking
    const booking = await Booking.create({
      user: req.user.id,
      beautician: assignedBeautician._id,
      services,
      totalAmount,
      discount,
      finalAmount,
      address,
      date,
      timeSlot,
      paymentStatus: "paid",
      razorpay: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
    });

    res.status(201).json({
      message: "Booking Confirmed",
      booking,
      assignedBeautician: assignedBeautician.name,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// 3. Get user bookings
export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate("services.service")
    .populate("beautician", "name email");
  res.status(200).json(bookings);
};

// 4. Cancel booking
export const cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "cancelled" },
    { new: true }
  );
  res.status(200).json(booking);
};
