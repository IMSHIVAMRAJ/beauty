import express from "express";
import {
  addService,
  approveService,
  getAllServices,
  getTrendingServices,
} from "../controllers/serviceController.js";

import { upload } from "../middlewares/multer.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  addService
);

router.get("/", getAllServices);
router.get("/trending", getTrendingServices);
router.patch("/service/:id/approve", protect, adminOnly, approveService);

export default router;
