import mongoose from "mongoose";

const beauticianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  profileImage: {
    type: String,
    default: "", // Optional image
  },

  expertise: [String],

 availableSlots: [
  {
    day: { type: String }, // e.g., 'Monday', 'Tuesday'
    startTime: { type: String }, // e.g., "09:00 AM"
    endTime: { type: String },   // e.g., "06:00 PM"
    isAvailable: { type: Boolean, default: false },
  },
],


  earnings: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("Beautician", beauticianSchema);
