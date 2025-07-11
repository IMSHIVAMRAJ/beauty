import express from "express";
import {
  adminAddBeautician,
  getAllBeauticians,
  deleteBeautician,
  addLocation,
  getLocations,
  toggleLocationStatus,
  getAdminDashboardStats,
  addCoupon,
  getCoupons,
  toggleCouponStatus,
  addBeauticianSlot 
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { approveService } from "../controllers/serviceController.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post(
  "/beautician/add",
  protect,
  adminOnly,
  upload.single("profileImage"),
  adminAddBeautician
);
router.post(
  "/beautician/:id/slots",
  protect,
  adminOnly,
  addBeauticianSlot
);
router.get("/beauticians", protect, adminOnly, getAllBeauticians);
router.delete("/beautician/:id", protect, adminOnly, deleteBeautician);

router.post("/location", protect, adminOnly, addLocation);
router.get("/locations", protect, adminOnly, getLocations);
router.patch("/location/:id/toggle", protect, adminOnly, toggleLocationStatus);
router.get("/dashboard/stats", protect, adminOnly, getAdminDashboardStats);
router.post("/coupon", protect, adminOnly, addCoupon);
router.get("/coupons", protect, adminOnly, getCoupons);
router.patch("/coupon/:id/toggle", protect, adminOnly, toggleCouponStatus);
router.patch("/service/:id/approve", protect, adminOnly, approveService);

export default router;
