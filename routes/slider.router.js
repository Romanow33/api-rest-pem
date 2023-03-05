import { Router } from "express";
import { createSlider, getSlider } from "../controllers/slider.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const router = Router();

router.get("/:id", requireRefreshToken, getSlider);
router.post("/", requireRefreshToken, createSlider);
export default router;
