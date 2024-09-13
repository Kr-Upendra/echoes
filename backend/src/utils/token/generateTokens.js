import jwt from "jsonwebtoken";
import {
  accessToken,
  refreshToken,
  accessTokenExpireTime,
  refreshTokenExpireTime,
} from "../helper/index.js";

export const generateAccessToken = (id, email) => {
  const payload = { _id: id.toString(), email: email };
  const token = jwt.sign(payload, accessToken, {
    expiresIn: accessTokenExpireTime,
  });
  return token;
};

export const generateRefreshToken = (id, email) => {
  const payload = { _id: id.toString(), email: email };
  const token = jwt.sign(payload, refreshToken, {
    expiresIn: refreshTokenExpireTime,
  });
  return token;
};
