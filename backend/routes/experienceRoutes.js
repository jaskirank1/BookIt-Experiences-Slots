import express from "express";
import { getAllExperiences, getExperienceById, getAvailabilityByDate, addExperience } from "../controllers/experienceController.js";

const router = express.Router();

router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);
router.get("/:id/availability", getAvailabilityByDate);
// router.post("/", addExperience); //  temporary seeding route

export default router;