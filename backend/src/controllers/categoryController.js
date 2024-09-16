import slugify from "slugify";
import {
  API_RESPONSE_CODE,
  API_RESPONSE_MESSAGE,
  API_RESPONSE_STATUS,
  sendResponse,
} from "../utils/api-response/index.js";
import { categoryModel } from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const authorId = req.user.id;
    const { title, description, color, isDefault, icon } = req.body;
    if (!title)
      return sendResponse(
        res,
        API_RESPONSE_CODE.BAD_REQUEST,
        API_RESPONSE_MESSAGE.BAD_REQUEST,
        API_RESPONSE_STATUS.FAILED
      );

    const slug = slugify(title, { trim: true, lower: true, replacement: "-" });

    const category = new categoryModel({
      title,
      slug,
      description,
      color,
      isDefault,
      icon,
      authorId,
    });

    await category.save();

    return sendResponse(
      res,
      API_RESPONSE_CODE.SUCCESS,
      API_RESPONSE_MESSAGE.RECORD_CREATED,
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
export const categories = async (req, res) => {};
export const category = async (req, res) => {};
export const updateCategory = async (req, res) => {};
export const deleteCategory = async (req, res) => {};
