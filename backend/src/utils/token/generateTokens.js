import jwt from "jsonwebtoken";
import {
  accessToken,
  accessTokenExpireTimeInSeconds,
  refreshToken,
  refreshTokenExpireTimeInSeconds,
} from "./../helper/index.js";

export const generateAccessToken = (id, email) => {
  const payload = { _id: id.toString(), email: email };
  const token = jwt.sign(payload, accessToken, {
    expiresIn: accessTokenExpireTimeInSeconds,
  });
  return token;
};

export const generateRefreshToken = (id, email) => {
  const payload = { _id: id.toString(), email: email };
  const token = jwt.sign(payload, refreshToken, {
    expiresIn: refreshTokenExpireTimeInSeconds,
  });
  return token;
};
