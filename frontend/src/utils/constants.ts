export const BASE_URL = import.meta.env.VITE_BASE_API_URL;
export const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabaseProjectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
export const supabaseUsersBucket = import.meta.env.VITE_SUPBASE_USERS_BUCKET;
const KB = 1024;
export const maxUploadFileSize = {
  userProfile: 50 * KB, // Maxfile size is 50KB
  userBanner: 200 * KB, // Maxfile size is 200KB
};
