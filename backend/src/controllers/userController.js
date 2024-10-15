import bcrypt from "bcryptjs";

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

  if (!validatePassword(newPassword))
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: "Not a valid password.",
    });

  try {
    const currentUser = await userModel.findById(user.id).select("password");
    const isMatch = await currentUser.isPasswordMatch(currentPassword);
    if (!isMatch)
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: "failed",
        message: "Current password is incorrect.",
      });

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    currentUser.password = hashedNewPassword;
    const result = await userModel.updateOne(
      { _id: user.id },
      { password: hashedNewPassword }
    );

    if (result.modifiedCount === 0) {
      return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: "failed",
        message: "Failed to update password.",
      });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Password updated successfully.",
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
};
