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
  getAllBeauticianslot,
  approveBookingAndAssignBeautician,
  getAllBookings
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { addService, approveService, deleteService, getAllServices } from "../controllers/serviceController.js";
import { upload } from "../middlewares/multer.js";
import { assignBeauticianToBooking } from "../controllers/bookingController.js";
const router = express.Router();

router.post(
  "/beautician/add",
  protect,
  adminOnly,
  upload.single("profileImage"),
  adminAddBeautician
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

router.post(
  "/add-service",
  // isAdmin, // uncomment if you want to restrict to only admin
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
    { name: "categoryImage", maxCount: 1 }
  ]),
  addService
);
router.get("/getservices", getAllServices);
export default router;
router.delete("/service/:id", protect, adminOnly, deleteService);
router.put("/assign-beautician",  protect, adminOnly, assignBeauticianToBooking); 
router.get("/beauticianslot", protect, adminOnly, getAllBeauticianslot);
router.patch("/bookings/:id/assign", protect, adminOnly, approveBookingAndAssignBeautician);
router.get("/allbookings", protect, adminOnly, getAllBookings);