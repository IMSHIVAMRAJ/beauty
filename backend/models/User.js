import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  phone: { type: String, required: true, unique: true },
   isVerified: { type: Boolean, default: false },
  email: String,
  gender: String,
  location: String,
  referralCode: String,
  address: String,
  profileImage: String,
  password: String, // hashed dummy password for JWT compatibility
  isVerified: { type: Boolean, default: false },
},{ timestamps: true });


export default mongoose.model("User", userSchema);
