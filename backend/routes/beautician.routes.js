import express from "express";
import {
  loginBeautician,
  updateBookingStatus,
  getEarnings,
  setWeeklyAvailability,
  getWeeklyAvailability,
  getBeauticianBookings,
} from "../controllers/beauticianController.js";

import { protect, protectBeautician } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginBeautician);
router.post("/set-availability", protect, setWeeklyAvailability);
router.get("/get-availability", protect, getWeeklyAvailability);
router.patch("/booking/:id", protect, updateBookingStatus);
router.get("/earnings", protect, getEarnings);
router.get("/my-bookings", protectBeautician, getBeauticianBookings);

export default router;
