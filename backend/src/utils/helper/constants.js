import dotenv from "dotenv";
dotenv.config();

export const accessToken = process.env.JWT_ACCESS_SECRET;
export const refreshToken = process.env.JWT_REFRESH_SECRET;
export const mongoUri = process.env.MONGODB_URI;
export const mongoUriLocal = process.env.MONGODB_URI_LOCAL;
export const dbPassword = process.env.DB_PASSWORD;
export const port = Number(process.env.PORT) || 8080;
export const nodeEnv = process.env.NODE_ENV;
export const accessTokenExpireTimeInSeconds = 60 * 60;
export const refreshTokenExpireTimeInSeconds = 7 * 24 * 60 * 60;

export const moodColors = {
  excited: "#FF9800",
  happy: "#4CAF50",
  neutral: "#F5F5F5",
  sad: "#673AB7",
  angry: "#D32F2F",
};

export const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://el-echoes.netlify.app/",
];

export const startOfDay = new Date().setHours(0, 0, 0, 0);
export const endOfDay = new Date().setHours(23, 59, 59, 999);
