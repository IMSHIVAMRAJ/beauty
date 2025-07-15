import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  subcategory: String,
  mainImage: String,
  subImages: [String],
  categoryImage: String,
  price: Number,
  discount: Number,
  finalPrice: Number,
  descriptionPoints: [String],
  precautionsAndAftercare: [String],
  ingredients: [String],

  isApproved: {
  type: Boolean,
  default: false
}
,
  usageCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
