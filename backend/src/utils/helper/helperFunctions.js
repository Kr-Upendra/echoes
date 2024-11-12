import slugify from "slugify";
import { moodColors } from "./constants.js";

export function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validatePassword(str) {
  if (str.length < 3) return false;
  return true;
}

export function createSlug(str) {
  return slugify(str, { trim: true, lower: true, replacement: "-" });
}

export const getMoodColor = (mood) => {
  return moodColors[mood];
};
