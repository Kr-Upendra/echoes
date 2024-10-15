import jwt from "jsonwebtoken";
import { accessToken } from "../utils/helper/index.js";
import { userModel } from "../models/userModel.js";
import {
  STATUS_CODES,
  API_RESPONSE_MESSAGE,
} from "../utils/api-response/index.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
    });

  try {
    const decoded = jwt.verify(token, accessToken);
    const freshUser = await userModel.findById(decoded._id).exec();

    if (!freshUser)
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
      });

    if (freshUser.changedPasswordAfter(decoded.iat))
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.INVALID_CREDENTIALS,
      });

    const user = {
      id: freshUser.id,
      email: freshUser.email,
      firstname: freshUser.firstName,
      lastname: freshUser.lastName,
      role: freshUser.userRole,
    };

    req.user = user;
    next();
  } catch (err) {
    console.log("error from middleware", err?.name);
    if (err?.name === "TokenExpiredError")
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        status: "failed",
        message: "Access denied due to expired token.",
        error: err?.name,
      });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req?.user?.role)) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
      });
    }
    next();
  };
};
