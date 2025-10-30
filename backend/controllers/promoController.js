import PromoCode from "../models/PromoCode.js";

// @desc    Validate promo code
// @route   POST /promo/validate
export const validatePromoCode = async (req, res) => {
  try {
    const { code, totalAmount } = req.body;

    if (!code || !totalAmount) {
      return res.status(400).json({ success: false, message: "Code and totalAmount are required" });
    }

    const promo = await PromoCode.findOne({ code: code.toUpperCase(), isActive: true });
    if (!promo)
      return res.status(404).json({ success: false, message: "Invalid promo code" });

    if (new Date() > promo.expiryDate)
      return res.status(400).json({ success: false, message: "Promo code expired" });

    let discount = 0;
    if (promo.type === "percentage") {
      discount = (totalAmount * promo.value) / 100;
    } else if (promo.type === "flat") {
      discount = promo.value;
    }

    const finalAmount = Math.max(totalAmount - discount, 0);

    res.status(200).json({
      success: true,
      data: {
        promoCode: promo.code,
        discount,
        finalAmount,
      },
    });
  } catch (error) {
    console.error("Error validating promo:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createPromoCode = async (req, res) => {
  try {
    const { code, type, value, expiryDate, isActive } = req.body;

    if (!code || !type || !value || !expiryDate) {
      return res.status(400).json({
        success: false,
        message: "All fields (code, type, value, expiryDate) are required",
      });
    }

    // Check for existing promo code
    const existingPromo = await PromoCode.findOne({ code: code.toUpperCase() });
    if (existingPromo) {
      return res.status(400).json({
        success: false,
        message: "Promo code already exists",
      });
    }

    // Create new promo code
    const newPromo = await PromoCode.create({
      code: code.toUpperCase(),
      type,
      value,
      expiryDate,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: "Promo code created successfully",
      data: newPromo,
    });
  } catch (error) {
    console.error("Error creating promo code:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};