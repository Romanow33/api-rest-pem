import { Router } from "express";
import { createEvent, getEvent, getEvents, removeEvent } from "../controllers/event.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyEventValidator } from "../middlewares/validatorManager.js";

const router = Router();
//root route: /api/v1
//GET   "/events":    root route  all events
//GET   "/events/:id" get event by id
//POST  "/events/"    create event by id
//PATCH "/events/:id" edit event by id
router.get("/", requireToken, getEvents);
router.get("/:id", requireToken, getEvent);
router.post("/", requireToken, bodyEventValidator, createEvent);
router.delete("/:id", requireToken, removeEvent);
export default router;
