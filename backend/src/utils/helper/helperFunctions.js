import slugify from "slugify";
import { moodColors } from "./constants.js";
import { dir } from "console";

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

export const getFileExt = (file) => {
  const parts = file.originalname.split(".");
  return parts.length > 1 ? parts.pop() : "";
};

// profile filename: user/avatar/user_avatar_user-id_timestamp.ext
// Jounral imagefilename and path: journals/[user_id]_user-id/[journal_id]-journal-id/images/journal_[kupendradev/username]_[1733405525182/timestamp]_[cl81b5ydv1t/random_string].png

// dir | dir | dir | dir | filename;
// jouranls/user_id /
//   journal_id /
//   images /
//   journal_username_timestamp_randomstring.png;

export const randomString = (length = 8) => {
  const str = "1234567890qwertyuioasdfghjklzxcvbnm";
  let result = "";
  const charactersLength = str.length;

  for (let i = 0; i < length; i++) {
    result += str.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const generateFileName = (dirs, uploadFor, index = 0) => {
  const timestamp = Date.now();
  const randStr = randomString();
  return `${dirs}/${uploadFor}_${timestamp}_${randStr}_${index}`;
};
