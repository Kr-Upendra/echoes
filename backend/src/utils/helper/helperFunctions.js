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

export const checkPasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumbers = /[0-9]/;
  const hasSpecialChars = /[!@#$%^&*(),.?"':{}|<>]/;

  if (password.length < minLength)
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters long.`,
    };

  if (!hasUpperCase.test(password))
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter.",
    };

  if (!hasLowerCase.test(password))
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter.",
    };

  if (!hasNumbers.test(password))
    return {
      isValid: false,
      message: "Password must contain at least one number.",
    };

  if (!hasSpecialChars.test(password))
    return {
      isValid: false,
      message: "Password must contain at least one special character.",
    };

  return {
    isValid: true,
    message: "Password is strong.",
  };
};

export const getStartAndEndDate = (dateString) => {
  let startOfDay, endOfDay;

  if (dateString) {
    const requestedDate = new Date(dateString);

    if (isNaN(requestedDate)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: "failed",
        message: "Invalid date format.",
      });
    }

    startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);
    endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);
  } else {
    startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);
  }

  return { startOfDay, endOfDay };
};

export const getStartAndEndMonth = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  return { startOfMonth, endOfMonth };
};
