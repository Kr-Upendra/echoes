import { Schema, model } from "mongoose";
import { moodColors } from "../utils/index.js";

const journalSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    tags: { type: [String], default: null },
    mood: {
      type: String,
      enum: ["excited", "happy", "neutral", "sad", "angry"],
      default: "neutral",
    },
    color: {
      type: String,
      required: true,
      default: moodColors.neutral,
    },
    images: { type: [String], default: [] },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
    streak: { type: Number },
    lastStreakDate: Date,
  },
  { timestamps: true }
);

const Journal = model("Journal", journalSchema);

export { Journal as journalModel };
