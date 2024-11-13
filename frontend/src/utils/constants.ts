import { ImageProperties } from "./types";

export const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabaseProjectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
export const supabaseUsersBucket = import.meta.env.VITE_SUPBASE_USERS_BUCKET;
export const supabaseNotesBucket = import.meta.env.VITE_SUPABASE_NOTES_BUCKET;
export const supabaseJournalsBucket = import.meta.env
  .VITE_SUPABASE_JOURNALS_BUCKET;
const KB = 1024;

export const userBannerImageProperties: ImageProperties = {
  acceptedTypes: {
    "image/*": [".jpeg", ".png", ".jpg"],
  },
  fileSize: { max: 200 * KB, min: 80 * KB },
  dimension: {
    width: { max: 1280, min: 1020 },
    height: { max: 720, min: 480 },
  },
  bucketName: supabaseUsersBucket,
  formValue: "profileBanner",
  keyName: "banner",
  dirName: "banners",
  preTitle: "user",
};

export const userProfileImageProperties = {
  acceptedTypes: {
    "image/*": [".jpeg", ".png", ".jpg"],
  },
  fileSize: { max: 50 * KB, min: 10 * KB },
  dimension: {
    width: { max: 200, min: 80 },
    height: { max: 200, min: 80 },
  },
  bucketName: supabaseUsersBucket,
  formValue: "profilePicture",
  keyName: "avatar",
  dirName: "avatar",
  preTitle: "user",
};
