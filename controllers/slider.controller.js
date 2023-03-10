import mongoose from "mongoose";
import { Slider } from "../models/Slider.js";

export const createSlider = async (req, res) => {
    try {
        const { slide:{slideName,images, eventId} } = req.body;
        const slider = new Slider({
            slideName,
            images,
            eventId
        });
        const newSlider = await slider.save();
        return res.status(201).json({ newSlider });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error del servidor" });
    }
};


export const getSlider = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ error: "Invalid Id" });
        const slider = await Slider.findById(id);
        if (!slider) return res.status(404).json({ error: "Slider not found" });
        return res.json(slider);
    } catch (error) {
        return res.status(500).json({ error: "Error del servidor" });
    }
};

export const removeSlider = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ error: "Invalid Id" });
        
      const slider = await Slider.findById(id);
  
      if (!slider) return res.status(404).json({ error: "Slider not found" });
      await slider.remove();
  
      return res.json({ slider });
    } catch (error) {
      return res.status(500).json({ error: "Error del servidor" });
    }
  };