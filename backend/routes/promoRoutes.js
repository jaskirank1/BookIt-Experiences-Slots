import express from "express";
import { validatePromoCode, createPromoCode } from "../controllers/promoController.js";

const router = express.Router();

router.post("/validate", validatePromoCode);
router.post("/create", createPromoCode);

export default router;
