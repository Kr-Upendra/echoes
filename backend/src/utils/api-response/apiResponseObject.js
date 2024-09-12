import { API_RESPONSE_STATUS } from "./apiResponseStatus.js";

export const sendResponse = (
  res,
  statusCode = 200,
  message,
  status = API_RESPONSE_STATUS.SUCCESS,
  data = null
) => {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};
