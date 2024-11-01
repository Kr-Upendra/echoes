import { voiceNoteModel } from "../models/voiceNoteModel.js";
import {
  API_RESPONSE_MESSAGE,
  createSlug,
  STATUS_CODES,
} from "../utils/index.js";

export const voiceNotes = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = (page - 1) * limit;
  const userId = req.user.id;

  try {
    const searchQuery = { author: userId };
    if (search) searchQuery["title"] = { $regex: search, $options: "i" };

    const count = await voiceNoteModel.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;

    const voiceNotes = await voiceNoteModel
      .find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author", "firstName lastName email");

    const pagination = {
      totalRecords: count,
      pageSize: limit,
      totalPages,
      currentPage: page,
      hasNextPage,
    };

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: API_RESPONSE_MESSAGE.RECORD_LIST,
      data: { voiceNotes, pagination },
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const voiceNote = async (req, res) => {
  try {
    const note = await voiceNoteModel
      .findById(req.params.id)
      .populate("author", "firstName lastName email");

    if (!note)
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Voice Note not found by given ID.",
      });

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Voice Note found by given ID.",
      data: {
        voiceNote: note,
      },
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const createVoiceNote = async (req, res) => {
  const author = req.user.id;
  const { title, description, tags, isFavorite, voiceNote } = req.body;
  if (!title || !voiceNote)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      messag: "Invalid inputs",
    });

  const slug = createSlug(title);
  try {
    const doesExist = await voiceNoteModel.findOne({ slug, author });
    if (doesExist)
      return res.status(STATUS_CODES.CONFLICT).json({
        status: "failed",
        message: API_RESPONSE_MESSAGE.RECORD_ALREADY_EXIST,
      });

    const newVoiceNote = new voiceNoteModel({
      title,
      slug,
      description,
      voiceNote,
      tags,
      isFavorite,
      author,
    });

    await newVoiceNote.save();

    return res.status(STATUS_CODES.CREATED).json({
      status: "success",
      message: "New voice note added.",
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateVoiceNote = async (req, res) => {
  const id = req.params.id;
  const { title, description, tags, isFavorite, voiceNote } = req.body;

  const updateFields = {};
  if (title !== undefined) {
    updateFields.title = title;
    updateFields.slug = createSlug(title);
  }
  if (description !== undefined) updateFields.description = description;
  if (tags !== undefined) updateFields.tags = tags;
  if (isFavorite !== undefined) updateFields.isFavorite = isFavorite;
  if (voiceNote !== undefined) updateFields.voiceNote = voiceNote;

  try {
    const updatedVoiceNote = await voiceNoteModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedVoiceNote) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Voice Note not found with given ID.",
      });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Voice Note updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteVoiceNote = async (req, res) => {
  try {
    const voiceNote = await voiceNoteModel.findByIdAndDelete(req.params.id);

    if (!voiceNote)
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Voice Note not found by given ID.",
      });

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Voice Note deleted successfully.",
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
