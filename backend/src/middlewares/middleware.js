import { accessToken } from "../utils/helper/index.js";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

import {
  API_RESPONSE_CODE,
  API_RESPONSE_MESSAGE,
  API_RESPONSE_STATUS,
  sendResponse,
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
    return sendResponse(
      res,
      API_RESPONSE_CODE.UNAUTHORIZED,
      API_RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
      API_RESPONSE_STATUS.FAILED
    );

  const decoded = jwt.verify(token, accessToken);
  const freshUser = await userModel.findById(decoded._id).exec();

  if (!freshUser)
    return sendResponse(
      res,
      API_RESPONSE_CODE.UNAUTHORIZED_ACCESS,
      API_RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
      API_RESPONSE_STATUS.FAILED
    );

  if (freshUser.changedPasswordAfter(decoded.iat))
    return sendResponse(
      res,
      API_RESPONSE_CODE.UNAUTHORIZED_ACCESS,
      API_RESPONSE_MESSAGE.INVALID_CREDENTIALS,
      API_RESPONSE_STATUS.FAILED
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
};


