import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";

// @desc    Create a booking
// @route   POST /bookings
export const createBooking = async (req, res) => {
  try {
    const {
      experienceId,
      date,         //  "YYYY-MM-DD"
      time,         // "10:00 AM"
      quantity,     // e.g. 2 seats
      user,         // { name, email }
      promoCode,
      discountAmount = 0,
      totalPrice,
    } = req.body;

    console.log(experienceId);
    console.log(date);
    console.log(time);
    console.log(quantity);
    console.log(user);
    console.log(promoCode);
    console.log(discountAmount);
    console.log(totalPrice);

    // Validate required fields
    if (!experienceId || !date || !time || !quantity || !user?.email || !user?.name ) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Fetch experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience not found" });
    }

    // Find the fixed slot matching the chosen time
    const slot = experience.fixedSlots.find((s) => s.time === time);
    if (!slot) {
      return res.status(400).json({ success: false, message: "Invalid time slot selected" });
    }

    // Check capacity
    const remaining = slot.maxCapacity - (slot.bookedCount || 0);
    if (remaining < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${remaining} slot(s) left for this time.`,
      });
    }

    // Create booking with "pending" status
    const booking = await Booking.create({
      experienceId,
      date,
      time,
      quantity,
      user,
      promoCode,
      discountAmount,
      totalPrice,
      status: "pending",
    });

    // Update experience slot's booked count
    slot.bookedCount = (slot.bookedCount || 0) + quantity;
    await experience.save();

    return res.status(201).json({
      success: true,
      message: "Booking created successfully (pending payment)",
      bookingId: booking._id,
      data: booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};