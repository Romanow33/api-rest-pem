import { Router } from "express";
import { createEvent, getEvent, getEvents, removeEvent, updateEvent, uploadImage, uploadSlide, uploadSlideImage } from "../controllers/event.controller.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyEventValidator } from "../middlewares/validatorManager.js";

const router = Router();
//root route: /api/v1
//GET   "/events":    root route  all events
//GET   "/events/:id" get event by id
//POST  "/events/"    create event by id
//PATCH "/events/:id" edit event by id
router.get("/", requireRefreshToken, getEvents);
router.get("/:id", requireRefreshToken, getEvent);
router.post("/", requireRefreshToken, bodyEventValidator, createEvent);
router.delete("/:id", requireRefreshToken, removeEvent);
router.patch("/:id", requireRefreshToken, updateEvent);
router.patch("/imageSrc/:id", requireRefreshToken, uploadImage);
router.patch("/slideimages/:id", requireRefreshToken, uploadSlideImage);
router.patch("/eventslide/:id", requireRefreshToken, uploadSlide);
export default router;
