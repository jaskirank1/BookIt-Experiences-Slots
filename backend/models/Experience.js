import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    // Fixed slots for the experience (defined by provider)
    fixedSlots: [
      {
        time: {
          type: String, // e.g. "7:00 AM"
          required: true,
        },
        maxCapacity: {
          type: Number, // e.g. 10 seats available for this time
          required: true,
          default: 10,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);