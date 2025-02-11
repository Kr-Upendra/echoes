import bcrypt from "bcryptjs";
import { userModel } from "../models/userModel.js";
import {
  STATUS_CODES,
  API_RESPONSE_MESSAGE,
} from "../utils/api-response/index.js";
import {
  asyncHandler,
  ErrorHandler,
  extractPublicId,
  validatePassword,
} from "../utils/index.js";
import { handleFileUpload } from "../services/index.js";
import { v2 as cloudinary } from "cloudinary";

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

export const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { firstName, lastName, about, socialMedia, address } = req.body;

  const bannerFile = req.files?.banner ? req.files.banner[0] : null;
  const profileFile = req.files?.profile ? req.files.profile[0] : null;

  let bannerUrl = null;
  let avatarUrl = null;

  const user = await userModel.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (bannerFile && user.profileBanner) {
    const oldBannerId = extractPublicId(user.profileBanner);
    if (oldBannerId) await cloudinary.uploader.destroy(oldBannerId);
  }

  if (profileFile && user.profilePicture) {
    const oldAvatarId = extractPublicId(user.profilePicture);
    if (oldAvatarId) await cloudinary.uploader.destroy(oldAvatarId);
  }

  if (bannerFile) {
    bannerUrl = await handleFileUpload(bannerFile, {
      dir: `userId_${userId}/banner`,
      subFilename: `user_banner`,
    });
  }

  if (profileFile) {
    avatarUrl = await handleFileUpload(profileFile, {
      dir: `userId_${userId}/avatar`,
      subFilename: `user_avatar`,
    });
  }

  const updateData = {};

  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (about !== undefined) updateData.about = about;
  if (bannerFile) updateData.profileBanner = bannerUrl[0];
  if (profileFile) updateData.profilePicture = avatarUrl[0];

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
    return next(new ErrorHandler("No data provided to make changes.", 400));

  await userModel.updateOne({ _id: userId }, { $set: updateData });

  return res.status(STATUS_CODES.SUCCESS).json({
    status: "success",
    message: "Profile updated successfully.",
  });
});

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
