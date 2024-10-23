import { noteModel } from "../models/noteModel.js";
import {
  API_RESPONSE_MESSAGE,
  createSlug,
  STATUS_CODES,
} from "../utils/index.js";

export const getNotes = async (req, res) => {
  const notes = await noteModel.find();

  return res.status(STATUS_CODES.SUCCESS).json({
    status: "success",
    message: API_RESPONSE_MESSAGE.RECORD_LIST,
    notes,
  });
};

export const createNote = async (req, res) => {
  const author = req.user.id;
  const { title, content, tags, isFavorite, category } = req.body;
  if (!title || !content || !category)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      messag: "Invalid inputs",
    });

  const slug = createSlug(title);
  try {
    const doesExist = await noteModel.findOne({ slug });
    if (doesExist)
      return res.status(STATUS_CODES.CONFLICT).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.RECORD_ALREADY_EXIST,
      });

    const note = new noteModel({
      title,
      slug,
      content,
      tags,
      isFavorite,
      category,
      author,
    });

    await note.save();

    return res.status(STATUS_CODES.CREATED).json({
      status: "success",
      messag: "New note added.",
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
