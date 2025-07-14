import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    services: [
      {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        quantity: Number,
      },
    ],
    totalAmount: Number,
    discount: Number,
    finalAmount: Number,
    address: String,
    date: String,
    timeSlot: String,

  
status: {
  type: String,
  enum: ["pending", "approved", "confirmed", "cancelled"],
  default: "pending"
}
,
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
beautician: { type: mongoose.Schema.Types.ObjectId, ref: "Beautician" },

    razorpay: {
      orderId: String,
      paymentId: String,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Booking", bookingSchema);
