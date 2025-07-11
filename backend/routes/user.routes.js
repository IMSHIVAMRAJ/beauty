import express from "express";
import { deleteProfile, getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

import { getUserBookings } from "../controllers/bookingController.js";
const router = express.Router();

router.get("/me", protect, getProfile);
router.delete("/deleteProfile", protect, deleteProfile);

router.put("/update", protect, upload.single("profileImage"), updateProfile);

router.get("/my", protect, getUserBookings);
export default router;
