import express from "express";
import {
  loginBeautician,
  setAvailability,
  getBeauticianBookings,
  updateBookingStatus,
  getEarnings,
  getMySlots,
  addAvailableSlots,
} from "../controllers/beauticianController.js";

import { protect, protectBeautician } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginBeautician);
router.get("/slots", protectBeautician, getMySlots);
router.post("/set-availability", protect, setAvailability);
router.get("/bookings", protect, getBeauticianBookings);
router.patch("/booking/:id", protect, updateBookingStatus);
router.get("/earnings", protect, getEarnings);
router.patch("/slots/add", protectBeautician, addAvailableSlots);

export default router;
