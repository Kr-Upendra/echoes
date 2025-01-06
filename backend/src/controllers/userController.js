import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { userModel } from "../models/userModel.js";
import {
  STATUS_CODES,
  API_RESPONSE_MESSAGE,
} from "../utils/api-response/index.js";
import {
  asyncHandler,
  ErrorHandler,
  getFileExt,
  validatePassword,
} from "../utils/index.js";

export const getUsers = async (req, res) => {
  const users = await userModel.find();

  return res.status(STATUS_CODES.SUCCESS).json({
    status: "success",
    message: API_RESPONSE_MESSAGE.RECORD_LIST,
    users,
  });
};

export const userProfile = async (req, res) => {
  const { id } = req.user;
  const excludeFields = "-password -passwordChangedAt -userRole -__v";
  const user = await userModel.findById(id).select(excludeFields);

  return res.status(STATUS_CODES.SUCCESS).json({
    status: "success",
    message: "Record found successfully.",
    data: { user },
  });
};

// profile filename: user/avatar/user_avatar_user-id_timestamp.ext
// Jounral imagefilename and path: journals/[user_id]_user-id/[journal_id]-journal-id/images/journal_[kupendradev/username]_[1733405525182/timestamp]_[cl81b5ydv1t/random_string].png
export const userProfileImage = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const file = req.file;
  if (!file) return next(new ErrorHandler("No file uploaded", 400));

  const fileExt = getFileExt(file);
  const timestamp = Date.now();

  const fileName = `avatars/user_avatar_${id}_${timestamp}.${fileExt}`;

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: fileName, folder: "user" }, // Directory and filename
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(file.buffer);
  });

  console.log("result: ", result);

  res.status(STATUS_CODES.SUCCESS).json({
    status: "success",
    message: "Profile Picture updated successfully.",
  });
});

export const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    firstName,
    lastName,
    about,
    profilePicture,
    profileBanner,
    socialMedia,
    address,
  } = req.body;

  const updateData = {};

  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (about !== undefined) updateData.about = about;
  if (profilePicture !== undefined) updateData.profilePicture = profilePicture;
  if (profileBanner !== undefined) updateData.profileBanner = profileBanner;

  if (address) {
    if (address.street !== undefined)
      updateData["address.street"] = address.street;
    if (address.city !== undefined) updateData["address.city"] = address.city;
    if (address.state !== undefined)
      updateData["address.state"] = address.state;
    if (address.country !== undefined)
      updateData["address.country"] = address.country;
    if (address.zipcode !== undefined)
      updateData["address.zipcode"] = address.zipcode;
  }

  if (socialMedia) {
    if (socialMedia.facebook !== undefined)
      updateData["socialMedia.facebook"] = socialMedia.facebook;
    if (socialMedia.thread !== undefined)
      updateData["socialMedia.thread"] = socialMedia.thread;
    if (socialMedia.twitter !== undefined)
      updateData["socialMedia.twitter"] = socialMedia.twitter;
    if (socialMedia.instagram !== undefined)
      updateData["socialMedia.instagram"] = socialMedia.instagram;
    if (socialMedia.website !== undefined)
      updateData["socialMedia.website"] = socialMedia.website;
  }

  if (Object.keys(updateData).length === 0)
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: "failed",
      message: "No data provided to made changes.",
    });

  try {
    const result = await userModel.updateOne(
      { _id: userId },
      { $set: updateData }
    );
    if (result.nModified === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "User not found or no changes made.",
      });
    }
    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Profile updated successfully.",
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: error?.message || "Something went wrong.",
    });
  }
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
