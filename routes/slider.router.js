import { Router } from "express";
import { createSlider, getSlider, removeSlider } from "../controllers/slider.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";

const router = Router();

router.get("/:id", requireRefreshToken, getSlider);
router.post("/", requireRefreshToken, createSlider);
router.delete("/:id", requireRefreshToken, removeSlider);

export default router;
