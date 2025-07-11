import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: Number,
  expiryDate: Date,
  isActive: { type: Boolean, default: true }
});

export default mongoose.model("Coupon", couponSchema);
