import express from "express";
import {
  createRazorpayOrder,
  confirmBooking,
  getUserBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-payment", protect, createRazorpayOrder);
router.post("/confirm", protect, confirmBooking);
router.get("/my-bookings", protect, getUserBookings);
router.put("/cancel/:id", protect, cancelBooking);

export default router;
