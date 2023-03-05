import { Schema, model } from "mongoose";

const sliderSchema = new Schema(
    {
        slideName: {
            type: String,
            require: true,
        },
        images: {
            type: Array,
        },
        eventId: { type: Schema.Types.ObjectId, require: true, ref: "Event" },
    },
    {
        timestamps: true,
    }
);

export const Slider = model("Slider", sliderSchema);
