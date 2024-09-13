// import jwt from "jsonwebtoken";
// import { accessToken } from "../utils/helper";

import {
  API_RESPONSE_CODE,
  API_RESPONSE_MESSAGE,
  API_RESPONSE_STATUS,
  sendResponse,
} from "../utils/api-response/index.js";

const protect = (req, res, next) => {
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
  console.log(token);

  //   // Check if token existse
  //   if (!token)
  //     return res
  //       .status(401)
  //       .json({ message: "Access denied, no token provided" });

  //   try {
  //     const verified = jwt.verify(token, accessToken);
  //     req.user = verified;
  //     next();
  //   } catch (error) {
  //     res.status(400).json({ message: "Invalid token" });
  //   }
  next();
};

export { protect };
