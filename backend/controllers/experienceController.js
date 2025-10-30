import Experience from "../models/Experience.js";
import Booking from "../models/Booking.js";

// @desc    Get all experiences
// @route   GET /experiences
export const getAllExperiences = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";

    const filter = searchQuery
      ? { title: { $regex: searchQuery, $options: "i" } }
      : {};

    const experiences = await Experience.find(filter)
      .select("title location basePrice images category description fixedSlots imageKey");

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get single experience by ID
// @route   GET /experiences/:id
export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAvailabilityByDate = async (req, res) => {
  try {
    const { id } = req.params; // experience ID
    const { date } = req.query; // 'YYYY-MM-DD' format

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date query parameter is required",
      });
    }
    console.log(date);
    
    // Find the experience
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    // Fetch all bookings for this experience on the given date
    const bookings = await Booking.find({
      experienceId: id,
      date,
    });

    // Prepare total quantity booked per slot
    const slotBookings = {};
    bookings.forEach((booking) => {
      const slotTime = booking.time;
      const qty = booking.quantity || 1;
      if (slotTime) {
        slotBookings[slotTime] = (slotBookings[slotTime] || 0) + qty;
      }
    });

    const response = experience.fixedSlots.map((slot) => {
      const totalQtyBooked = slotBookings[slot.time] || 0;
      const remainingSeats = Math.max(slot.maxCapacity - totalQtyBooked, 0);

      return {
        time: slot.time,
        bookedCount: totalQtyBooked,
        maxCapacity: slot.maxCapacity,
        remainingSeats,
      };
    });

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    console.error("Error adding experience:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};