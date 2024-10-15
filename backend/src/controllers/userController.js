import { userModel } from "../models/userModel.js";
import {
  STATUS_CODES,
  API_RESPONSE_MESSAGE,
} from "../utils/api-response/index.js";
import { validatePassword } from "../utils/index.js";

export const getUsers = async (req, res) => {
  const users = await userModel.find();

  return res.status(STATUS_CODES.SUCCESS).json({
    status: "success",
    message: API_RESPONSE_MESSAGE.RECORD_LIST,
    users,
  });
};

export const updatePassword = async (req, res) => {
  const user = req.user;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: "Invalid input.",
    });

  if (!validatePassword(str))
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: "Not a valid password.",
    });

  try {
    console.log({ currentPassword, newPassword, user });
    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Password updated successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
};
