import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    experienceId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Experience", 
      required: true, 
    },
    date: {
      type: String, // "YYYY-MM-DD"
      required: true,
    },
    time: {
      type: String, // must match one of the Experience.fixedSlots.time
      required: true,
    },
    quantity: {
      type: Number,    // how many qty booked by the user
      required: true,
      min: 1,
    },
    user: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
    },
    promoCode: {
      type: String,
      default: null,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "failed"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
