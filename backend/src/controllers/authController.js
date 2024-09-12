import { userModel } from "../models/userModel.js";
import { userSessionModel } from "../models/userSessionModel.js";
import {
  API_RESPONSE_CODE,
  API_RESPONSE_MESSAGE,
  API_RESPONSE_STATUS,
  sendResponse,
} from "../utils/api-response/index.js";
import { capitalizeFirstLetter } from "../utils/helper/index.js";
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
      API_RESPONSE_STATUS.ERROR,
      API_RESPONSE_MESSAGE.BAD_REQUEST
    );
  try {
    const user = await userModel.findOne({ where: { email } });
    if (user)
      return sendResponse(
        res,
        API_RESPONSE_CODE.CONFLICT,
        API_RESPONSE_STATUS.FAILED,
        API_RESPONSE_MESSAGE.EMAIL_ALREADY_IN_USE
      );

    await userModel.create({
      email,
      password,
      firstName: capitalizeFirstLetter(firstname),
      lastName: capitalizeFirstLetter(lastname),
    });

    return res.status(API_RESPONSE_CODE.SUCCESS).json({
      status: API_RESPONSE_STATUS.SUCCESS,
      message: API_RESPONSE_MESSAGE.REGISTER_SUCCESS,
    });
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
      API_RESPONSE_STATUS.ERROR,
      API_RESPONSE_MESSAGE.BAD_REQUEST
    );
  try {
    const user = await userModel.findOne({ email: email });
    if (!user)
      return sendResponse(
        res,
        API_RESPONSE_CODE.UNAUTHORIZED,
        API_RESPONSE_STATUS.FAILED,
        API_RESPONSE_MESSAGE.INVALID_CREDENTIALS
      );

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch)
      return sendResponse(
        res,
        API_RESPONSE_CODE.UNAUTHORIZED,
        API_RESPONSE_STATUS.FAILED,
        API_RESPONSE_MESSAGE.INVALID_CREDENTIALS
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
        Date.now() + parseInt(process.env.JWT_ACCESS_EXPIRE_TIME, 10) * 1000
      ),
    };

    await userSessionModel.create(session);

    const data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      accessToken,
      refreshToken,
    };

    return sendResponse(
      res,
      API_RESPONSE_CODE.SUCCESS,
      API_RESPONSE_STATUS.SUCCESS,
      API_RESPONSE_MESSAGE.LOGIN_SUCCESS,
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
