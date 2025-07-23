import crypto from "crypto";
import { userModel } from "../models/userModel.js";
import { userSessionModel } from "../models/userSessionModel.js";
import {
  capitalizeFirstLetter,
  nodeEnv,
  STATUS_CODES,
  API_RESPONSE_MESSAGE,
  generateAccessToken,
  generateRefreshToken,
  checkPasswordStrength,
  sendEmail,
  onBoardEmailTemplate,
  passwordResetTemplate,
  refreshTokenExpireTimeInSeconds,
  accessTokenExpireTimeInSeconds,
  asyncHandler,
  ErrorHandler,
} from "../utils/index.js";

export const register = asyncHandler(async (req, res, next) => {
  const { email, firstname, lastname, password } = req.body;

  if (!email || !firstname || !lastname || !password)
    return next(new ErrorHandler("Invalid input values.", 400));

  const { isValid, message } = checkPasswordStrength(password);
  if (!isValid) return next(new ErrorHandler(message, 400));

  const lowerEmail = email.toLowerCase();

  const user = await userModel.findOne({ email: lowerEmail });
  if (user) return next(new ErrorHandler("Email already exist.", 409));

  await userModel.create({
    email: lowerEmail,
    password,
    firstName: capitalizeFirstLetter(firstname),
    lastName: capitalizeFirstLetter(lastname),
  });

  const template = onBoardEmailTemplate(firstname, lastname);

  await sendEmail(email, "Welcome to El Echoes 🎉!", template);

  res.status(201).json({
    status: "success",
    message: "You are successfully registered.",
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];

  if (!email || !password)
    return next(new ErrorHandler("Email and password is required.", 400));

  const user = await userModel.findOne({ email: email });

  if (!user) return next(new ErrorHandler("Invalid email or password.", 400));

  const isMatch = await user.isPasswordMatch(password);

  if (!isMatch)
    return next(new ErrorHandler("Invalid email or password.", 400));

  const accessToken = generateAccessToken(user._id, user.email);
  const refreshToken = generateRefreshToken(user._id, user.email);

  const session = {
    userId: user._id,
    accessToken,
    refreshToken,
    ipAddress,
    userAgent,
    expiresAt: new Date(
      Date.now() + parseInt(refreshTokenExpireTimeInSeconds, 10) * 1000
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
    maxAge: accessTokenExpireTimeInSeconds,
    sameSite: "strict",
    path: "/",
    domain: "localhost",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: nodeEnv === "production",
    maxAge: refreshTokenExpireTimeInSeconds,
    sameSite: "strict",
    path: "/",
    domain: "localhost",
  });

  res.status(200).json({
    status: "success",
    message: "You logged in successfully.",
    data,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  const result = await userSessionModel.deleteOne({ userId });
  console.log(result);

  res.status(200).json({
    status: "success",
    message: "You are logged out successfully.",
  });
});

export const check = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) return next(new ErrorHandler("Unauthorized access.", 401));

  const userSession = await userSessionModel.findOne({ userId });
  if (!userSession)
    return next(new ErrorHandler("Your session has been expired.", 401));

  res.status(200).json({
    status: "success",
    message: "Session is valid",
    data: { userId },
  });
});

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

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  const { isValid, message } = checkPasswordStrength(password);
  if (!isValid) return next(new ErrorHandler(message, 400));

  const hashedCrypto = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    passwordResetToken: hashedCrypto,
    passwordResetExpire: { $gt: Date.now() },
  });
  if (!user)
    return next(new ErrorHandler("Token is invalid or has expired.", 400));

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Your password has been changed successfully.",
  });
});
