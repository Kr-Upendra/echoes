import { userModel } from "../models/userModel.js";
import { userSessionModel } from "../models/userSessionModel.js";
import {
  API_RESPONSE_CODE,
  API_RESPONSE_MESSAGE,
  API_RESPONSE_STATUS,
  sendResponse,
} from "../utils/api-response/index.js";
import {
  accessTokenExpireTime,
  capitalizeFirstLetter,
  nodeEnv,
  refreshTokenExpireTime,
} from "../utils/helper/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token/generateTokens.js";

export const register = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  if (!email || !firstname || !lastname || !password)
    return sendResponse(
      res,
      API_RESPONSE_CODE.BAD_REQUEST,
      API_RESPONSE_MESSAGE.BAD_REQUEST,
      API_RESPONSE_STATUS.ERROR
    );
  try {
    const user = await userModel.findOne({ email });
    if (user)
      return sendResponse(
        res,
        API_RESPONSE_CODE.CONFLICT,
        API_RESPONSE_MESSAGE.EMAIL_ALREADY_IN_USE,
        API_RESPONSE_STATUS.FAILED
      );

    await userModel.create({
      email,
      password,
      firstName: capitalizeFirstLetter(firstname),
      lastName: capitalizeFirstLetter(lastname),
    });

    return sendResponse(
      res,
      API_RESPONSE_CODE.CREATED,
      API_RESPONSE_MESSAGE.REGISTER_SUCCESS,
      API_RESPONSE_STATUS.SUCCESS
    );
  } catch (error) {
    console.log(error);
    return res.status(API_RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
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
    return sendResponse(
      res,
      API_RESPONSE_CODE.BAD_REQUEST,
      API_RESPONSE_MESSAGE.BAD_REQUEST,
      API_RESPONSE_STATUS.ERROR
    );
  try {
    const user = await userModel.findOne({ email: email });
    if (!user)
      return sendResponse(
        res,
        API_RESPONSE_CODE.UNAUTHORIZED,
        API_RESPONSE_MESSAGE.INVALID_CREDENTIALS,
        API_RESPONSE_STATUS.FAILED
      );

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch)
      return sendResponse(
        res,
        API_RESPONSE_CODE.UNAUTHORIZED,
        API_RESPONSE_MESSAGE.INVALID_CREDENTIALS,
        API_RESPONSE_STATUS.FAILED
      );

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
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      role: user.userRole,
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

    return sendResponse(
      res,
      API_RESPONSE_CODE.SUCCESS,
      API_RESPONSE_MESSAGE.LOGIN_SUCCESS,
      API_RESPONSE_STATUS.SUCCESS,
      data
    );
  } catch (error) {
    console.log(error);
    return res.status(API_RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const check = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to verify the JWT and attach user info

    if (!userId) {
      return sendResponse(
        res,
        API_RESPONSE_CODE.UNAUTHORIZED,
        API_RESPONSE_MESSAGE.UNAUTHORIZED,
        API_RESPONSE_STATUS.FAILED
      );
    }

    const userSession = await userSessionModel.findOne({ userId });
    if (!userSession) {
      return sendResponse(
        res,
        API_RESPONSE_CODE.UNAUTHORIZED,
        API_RESPONSE_MESSAGE.SESSION_EXPIRED,
        API_RESPONSE_STATUS.FAILED
      );
    }

    return sendResponse(
      res,
      API_RESPONSE_CODE.SUCCESS,
      API_RESPONSE_MESSAGE.SESSION_VALID,
      API_RESPONSE_STATUS.SUCCESS,
      { userId } // Optionally send back user info
    );
  } catch (error) {
    console.log(error);
    return res.status(API_RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
