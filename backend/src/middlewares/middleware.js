import jwt from "jsonwebtoken";
import { accessToken } from "../utils/helper/index.js";
import { userModel } from "../models/userModel.js";
import {
  STATUS_CODES,
  API_RESPONSE_MESSAGE,
} from "../utils/api-response/index.js";
import { userSessionModel } from "../models/userSessionModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token)
    return next(
      new ErrorHandler(
        "Authentication required. Please log in to continue.",
        401
      )
    );

  const decoded = jwt.verify(token, accessToken);

  const userSession = await userSessionModel.findOne({ userId: decoded._id });

  if (!userSession)
    return next(
      new ErrorHandler(
        "Session has expired or been logged out. Please log in again.",
        401
      )
    );

  const freshUser = await userModel.findById(decoded._id).exec();

  if (!freshUser)
    return next(new ErrorHandler("User not found. Please log in again.", 401));

  if (freshUser.changedPasswordAfter(decoded.iat))
    return next(
      new ErrorHandler("Password has been changed. Please log in again.", 401)
    );

  const user = {
    id: freshUser.id,
    email: freshUser.email,
    firstname: freshUser.firstName,
    lastname: freshUser.lastName,
    role: freshUser.userRole,
  };

  req.user = user;
  next();
});

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
