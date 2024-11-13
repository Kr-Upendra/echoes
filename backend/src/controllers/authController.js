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
} from "../utils/index.js";

export const register = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  if (!email || !firstname || !lastname || !password)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.BAD_REQUEST,
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
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: nodeEnv === "production", // Use secure cookies in production
      maxAge: parseInt(accessTokenExpireTime, 10) * 1000, // Same expiration as the access token
      sameSite: "strict", // CSRF protection
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: parseInt(refreshTokenExpireTime, 10) * 1000, // Set refresh token expiration as well
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
