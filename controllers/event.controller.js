import mongoose from "mongoose";
import { Event } from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, type, eventDate } = req.body;
    const event = new Event({
      title,
      type,
      eventDate,
      uid: req.uid,
    });
    const newEvent = await event.save();
    return res.status(201).json({ newEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const Events = await Event.find({ uid: req.uid });
    return res.json({ Events });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "Invalid Id" });

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ error: "Event not found" });
    const eventUId = event.uid.toString();

    if (eventUId !== req.uid)
      return res.status(401).json({ error: "Dont disturb please" });

    return res.json(event);
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const removeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "Invalid Id" });

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ error: "Event not found" });
    const eventUId = event.uid.toString();

    if (eventUId !== req.uid)
      return res.status(401).json({ error: "Dont disturb please" });

    await event.remove();

    return res.json({ event });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.body.title)
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "Invalid Id" });

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ error: "Event not found" });
    const eventUId = event.uid.toString();

    if (eventUId !== req.uid)
      return res.status(401).json({ error: "Dont disturb please" });

    event.title = req.body.title
    event.type = req.body.type
    event.eventDate = req.body.eventDate
    event.imagesSrcs = req.body.imagesSrcs
    await event.save();
    return res.json({ event });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};
export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body.imagesSrcs)
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "Invalid Id" });

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ error: "Event not found" });
    const eventUId = event.uid.toString();

    if (eventUId !== req.uid)
      return res.status(401).json({ error: "Dont disturb please" });

    event.imagesSrcs = [...event.imagesSrcs, ...req.body.imagesSrcs]
    await event.save();
    return res.json({ event });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const uploadSlideImage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body.slidesImages)
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "Invalid Id" });

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ error: "Event not found" });
    const eventUId = event.uid.toString();

    if (eventUId !== req.uid)
      return res.status(401).json({ error: "Dont disturb please" });

    event.slidesImages = [...event.slidesImages, ...req.body.slidesImages]
    await event.save();
    return res.json({ event });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const uploadSlide = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "Invalid Id" });

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ error: "Event not found" });
    const eventUId = event.uid.toString();

    if (eventUId !== req.uid)
      return res.status(401).json({ error: "Dont disturb please" });

    event.eventSlides = [...event.eventSlides, req.body.slide]
    await event.save();
    return res.json({ event });
  } catch (error) {
    console.log(error)

    return res.status(500).json({ error: "Error del servidor" });
  }
};
