import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    imagesSrcs: {
      type: Array,
    },
    uploadAssets: {
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
