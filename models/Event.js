import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    imagesSrcs: {
      type: Array,
    },
    slidesImages: {
      type: Array,
    },
    eventSlides: {
      type: Array,
    },
    uid: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    type: { type: String, require: true },
    eventDate: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const Event = model("Event", eventSchema);
