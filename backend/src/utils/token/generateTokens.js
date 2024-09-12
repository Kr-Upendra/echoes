import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const generateAccessToken = (id, email) => {
  const payload = { _id: id.toString(), email: email };
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const accessExpireTime = process.env.JWT_ACCESS_EXPIRE_TIME;

  const token = jwt.sign(payload, accessSecret, {
    expiresIn: accessExpireTime,
  });
  return token;
};

export const generateRefreshToken = (id, email) => {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;
  const refreshExpireTime = process.env.JWT_REFRESH_EXPIRE_TIME;
  const payload = { _id: id.toString(), email: email };

  const token = jwt.sign(payload, refreshSecret, {
    expiresIn: refreshExpireTime,
  });
  return token;
};
