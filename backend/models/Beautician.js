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
      date: String,
      timeSlots: [String],
    },
  ],

  earnings: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("Beautician", beauticianSchema);
