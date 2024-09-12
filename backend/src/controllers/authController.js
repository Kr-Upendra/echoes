import { userModel } from "../models/userModel.js";
import {
  API_RESPONSE_CODE,
  API_RESPONSE_MESSAGE,
  API_RESPONSE_STATUS,
  sendResponse,
} from "../utils/api-response/index.js";
import { capitalizeFirstLetter } from "../utils/helper/index.js";

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

export const login = (req, res) => {
  try {
    return res.status(API_RESPONSE_CODE.SUCCESS).json({
      status: API_RESPONSE_STATUS.SUCCESS,
      message: API_RESPONSE_MESSAGE.LOGIN_SUCCESS,
    });
  } catch (error) {
    return res.status(API_RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
