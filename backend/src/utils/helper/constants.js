import dotenv from "dotenv";
dotenv.config();

export const accessToken = process.env.JWT_ACCESS_SECRET;
export const accessTokenExpireTime = process.env.JWT_ACCESS_EXPIRE_TIME;
export const refreshToken = process.env.JWT_REFRESH_SECRET;
export const refreshTokenExpireTime = process.env.JWT_REFRESH_EXPIRE_TIME;
export const mongoUri = process.env.MONGODB_URI;
export const mongoUriLocal = process.env.MONGODB_URI_LOCAL;
export const dbPassword = process.env.DB_PASSWORD;
export const port = Number(process.env.PORT) || 8080;
export const nodeEnv = process.env.NODE_ENV;
