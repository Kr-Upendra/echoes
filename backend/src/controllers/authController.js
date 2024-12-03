import crypto from "crypto";
import { userModel } from "../models/userModel.js";
import { userSessionModel } from "../models/userSessionModel.js";
import {
  accessTokenExpireTime,
  capitalizeFirstLetter,
  nodeEnv,
  refreshTokenExpireTime,
  STATUS_CODES,
  API_RESPONSE_MESSAGE,
  generateAccessToken,
  generateRefreshToken,
  checkPasswordStrength,
  sendEmail,
  onBoardEmailTemplate,
  passwordResetTemplate,
} from "../utils/index.js";

export const register = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  if (!email || !firstname || !lastname || !password)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.BAD_REQUEST,
    });

  const { isValid, message } = checkPasswordStrength(password);
  if (!isValid)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: message,
    });

  try {
    const user = await userModel.findOne({ email });
    if (user)
      return res.status(STATUS_CODES.CONFLICT).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.EMAIL_ALREADY_IN_USE,
      });

    await userModel.create({
      email,
      password,
      firstName: capitalizeFirstLetter(firstname),
      lastName: capitalizeFirstLetter(lastname),
    });

    const template = onBoardEmailTemplate(firstname, lastname);

    await sendEmail(email, "Welcome to El Echoes 🎉!", template);

    return res.status(STATUS_CODES.CREATED).json({
      status: "success",
      message: API_RESPONSE_MESSAGE.REGISTER_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress; // Capture IP address
  const userAgent = req.headers["user-agent"];

  if (!email || !password)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.BAD_REQUEST,
    });
  try {
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.INVALID_CREDENTIALS,
      });

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch)
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.INVALID_CREDENTIALS,
      });

    const accessToken = generateAccessToken(user._id, user.email);
    const refreshToken = generateRefreshToken(user._id, user.email);

    const session = {
      userId: user._id,
      accessToken,
      refreshToken,
      ipAddress,
      userAgent,
      expiresAt: new Date(
        Date.now() + parseInt(accessTokenExpireTime, 10) * 1000
      ),
    };

    await userSessionModel.create(session);

    const data = {
      user: {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.userName,
        profilePicture: user.profilePicture,
        role: user.userRole,
      },
      accessToken,
      refreshToken,
    };

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: parseInt(accessTokenExpireTime, 10) * 1000,
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: parseInt(refreshTokenExpireTime, 10) * 1000,
      sameSite: "strict",
    });

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: API_RESPONSE_MESSAGE.LOGIN_SUCCESS,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const check = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to verify the JWT and attach user info

    if (!userId) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.UNAUTHORIZED_ACCESS,
      });
    }

    const userSession = await userSessionModel.findOne({ userId });
    if (!userSession) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.SESSION_EXPIRED,
      });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: API_RESPONSE_MESSAGE.SESSION_VALID,
      data: { userId },
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.BAD_REQUEST,
    });

  const user = await userModel.findOne({ email });
  if (!user)
    return res.status(STATUS_CODES.NOT_FOUND).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.EMAIL_NOT_FOUND,
    });

  try {
    const resetToken = await user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const frontendUrl =
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL_PROD
        : process.env.FRONTEND_URL_DEV;
    const resetURL = `${frontendUrl}/reset-password/${resetToken}`;

    const template = passwordResetTemplate(
      `${user.firstName} ${user.lastName}`,
      resetURL
    );
    await sendEmail(user.email, "Reset your Password", template);

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Password reset link sent to your email.",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });

    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { password } = req.body;

  const { isValid, message } = checkPasswordStrength(password);
  if (!isValid)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: message,
    });

  const hashedCrypto = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await userModel.findOne({
      passwordResetToken: hashedCrypto,
      passwordResetExpire: { $gt: Date.now() },
    });
    if (!user)
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: "failed",
        message: "Token is invalid or has expired.",
      });

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Your password has been changed successfully.",
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
