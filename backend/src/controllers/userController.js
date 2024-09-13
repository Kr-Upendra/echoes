import { userModel } from "../models/userModel.js";
import {
  API_RESPONSE_CODE,
  API_RESPONSE_MESSAGE,
  API_RESPONSE_STATUS,
  sendResponse,
} from "../utils/api-response/index.js";

export const getUsers = async (req, res) => {
  const users = await userModel.find();

  return sendResponse(
    res,
    API_RESPONSE_CODE.SUCCESS,
    API_RESPONSE_MESSAGE.RECORD_LIST,
    API_RESPONSE_STATUS.SUCCESS,
    users
  );
};
