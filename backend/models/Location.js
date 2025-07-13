import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  city: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("Location", locationSchema);
