import { noteModel } from "../models/noteModel.js";
import {
  API_RESPONSE_MESSAGE,
  createSlug,
  STATUS_CODES,
} from "../utils/index.js";

// export const notes = async (req, res) => {
//   const page = Number(req.query.page) || 1;
//   const limit = Number(req.query.limit) || 10;
//   const search = req.query.search || "";
//   const offset = (page - 1) * limit;
//   const userId = req.user.id;
//   console.log("userId", userId);
//   try {
//     const searchQuery = { author: userId };

//     if (search) searchQuery["title"] = { $regex: search, $options: "i" };

//     const count = await noteModel.countDocuments(searchQuery);
//     const totalPages = Math.ceil(count / limit);
//     const hasNextPage = page < totalPages;

//     const notes = await noteModel
//       .find(searchQuery)
//       .sort({ createdAt: -1 })
//       .skip(offset)
//       .limit(limit)
//       .populate("author", "firstName lastName email")
//       .populate("category", "title slug");

//     console.log(notes);

//     const pagination = {
//       totalRecords: count,
//       pageSize: limit,
//       totalPages,
//       currentPage: page,
//       hasNextPage,
//     };

//     return res.status(STATUS_CODES.SUCCESS).json({
//       status: "success",
//       message: API_RESPONSE_MESSAGE.RECORD_LIST,
//       data: { notes, pagination },
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
//       status: "failed",
//       message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
//     });
//   }
// };
//

export const notes = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = (page - 1) * limit;
  const userId = req.user.id;

  try {
    const searchQuery = { author: userId };

    if (search) searchQuery["title"] = { $regex: search, $options: "i" };

    const count = await noteModel.countDocuments(searchQuery);

    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;

    const notes = await noteModel
      .find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author", "firstName lastName email")
      .populate("category", "title slug");

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
      data: { notes, pagination },
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const note = async (req, res) => {
  try {
    const note = await noteModel
      .findById(req.params.id)
      .populate("author", "firstName lastName email")
      .populate("category", "title slug");

    if (!note)
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Note not found by given ID.",
      });

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Note found by given ID.",
      data: {
        note,
      },
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
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

export const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, content, tags, isFavorite, category } = req.body;

  const updateFields = {};
  if (title !== undefined) {
    updateFields.title = title;
    updateFields.slug = createSlug(title);
  }
  if (content !== undefined) updateFields.content = content;
  if (tags !== undefined) updateFields.tags = tags;
  if (isFavorite !== undefined) updateFields.isFavorite = isFavorite;
  if (category !== undefined) updateFields.category = category;

  try {
    const updatedNote = await noteModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Note not found with given ID.",
      });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Note updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await noteModel.findByIdAndDelete(req.params.id);

    if (!note)
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Note not found by given ID.",
      });

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Note deleted successfully.",
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
