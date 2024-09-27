import slugify from "slugify";
import {
  STATUS_CODES,
  API_RESPONSE_MESSAGE,
  API_RESPONSE_STATUS,
  sendResponse,
} from "../utils/api-response/index.js";
import { categoryModel } from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const authorId = req.user.id;
    const { title, description, color, icon } = req.body;
    if (!title)
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: "failed",
        messag: "Invalid inputs",
      });

    const slug = slugify(title, { trim: true, lower: true, replacement: "-" });
    const isDefault = req.user.role === "admin" ? true : false;

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

    return res.status(STATUS_CODES.CREATED).json({
      status: "success",
      messag: "New category created.",
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const categories = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = (page - 1) * limit;
  try {
    let query = categoryModel.find({
      title: { $regex: search, $options: "i" },
    });
    query = query.skip(offset).limit(limit);

    const categories = await query;

    const count = await categoryModel.countDocuments();
    const pagination = {
      totalRecords: count,
      pageSize: limit,
      totalPages: 1,
      currentPage: 1,
      hasNextPage: true,
    };
    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "All categories list",
      data: {
        categories,
        pagination,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const category = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Category found by given ID.",
      data: {
        category,
      },
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { title, description, color, icon } = req.body;

  const updateFields = {};
  if (title !== undefined) {
    updateFields.title = title;
    updateFields.slug = slugify(title, {
      trim: true,
      lower: true,
      replacement: "-",
    });
  }
  if (description !== undefined) updateFields.description = description;
  if (color !== undefined) updateFields.color = color;
  if (icon !== undefined) updateFields.icon = icon;

  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Category updated successfully",
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Category deleted successfully.",
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: API_RESPONSE_STATUS.ERROR,
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
