import express from "express";
import {
  addService,
  approveService,
  deleteService,
  getAllServices,
  getTrendingServices,
} from "../controllers/serviceController.js";

import { upload } from "../middlewares/multer.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import Service from "../models/Service.js";
const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  addService
);

router.get("/allservices", getAllServices);
router.get("/trending", getTrendingServices);
router.patch("/service/:id/approve", protect, adminOnly, approveService);
router.delete("/service/:id", protect, adminOnly, deleteService);
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
   const results = await Service.find(
  { name: { $regex: query, $options: "i" } },
  { name: 1, _id: 1, categorySlug: 1 } // 👈 important
);

    res.json(results);
  } catch (err) {
    console.error("Search Error: ", err);
    res.status(500).json({ error: "Search failed" });
  }
});
export default router;
