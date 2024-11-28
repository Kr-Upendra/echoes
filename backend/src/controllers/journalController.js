import { journalModel } from "../models/journalModel.js";
import {
  API_RESPONSE_MESSAGE,
  createSlug,
  getMoodColor,
  getStartAndEndDate,
  STATUS_CODES,
} from "../utils/index.js";

export const createJournal = async (req, res) => {
  const user = req.user.id;
  const { title, content, tags, images, mood } = req.body;
  if (!title || !content)
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      messag: "Invalid inputs.",
    });

  const slug = createSlug(title);
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const journalsToday = await journalModel.countDocuments({
      user,
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    });

    if (journalsToday >= 5) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        status: "failed",
        message: "You can only create 5 journals per day.",
      });
    }

    const doesExist = await journalModel.findOne({ slug, user });
    if (doesExist)
      return res.status(STATUS_CODES.CONFLICT).json({
        status: "failed",
        message: "Title already exists.",
      });

    const color = getMoodColor(mood);

    const journal = new journalModel({
      title,
      slug,
      content,
      tags,
      mood,
      images,
      color,
      user,
    });

    await journal.save();

    return res.status(STATUS_CODES.CREATED).json({
      status: "success",
      message: "New journal added.",
      data: { journalId: journal._id },
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAllJournal = async (req, res) => {
  const search = req.query.search || "";
  const userId = req.user.id;
  const queryDate = req.query.date;

  const currentDate = new Date();
  const requestedDate = new Date(queryDate);

  if (requestedDate > currentDate) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      status: "failed",
      message: "Cannot query journals for a future date.",
    });
  }

  try {
    const searchQuery = { user: userId };
    if (search) searchQuery["title"] = { $regex: search, $options: "i" };

    const { startOfDay, endOfDay } = getStartAndEndDate(queryDate);

    searchQuery["createdAt"] = { $gte: startOfDay, $lt: endOfDay };

    const count = await journalModel.countDocuments(searchQuery);

    const journals = await journalModel
      .find(searchQuery)
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName email")
      .select("-__v");

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: API_RESPONSE_MESSAGE.RECORD_LIST,
      data: { total: count, journals, date: queryDate },
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getJournal = async (req, res) => {
  try {
    const journal = await journalModel
      .findById(req.params.id)
      .populate("user", "firstName lastName email")
      .select("-__v");

    if (!journal)
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Journal not found by given ID.",
      });

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Journal found by given ID.",
      data: {
        journal,
      },
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const updateJournal = async (req, res) => {
  const id = req.params.id;
  const { title, content, tags, mood, images, imagesToDelete } = req.body;

  const updateFields = {};

  if (title !== undefined) {
    updateFields.title = title;
    updateFields.slug = createSlug(title);
  }

  if (content !== undefined) updateFields.content = content;

  if (tags !== undefined) updateFields.tags = tags;

  if (mood !== undefined) {
    updateFields.mood = mood;
    const color = getMoodColor(mood);
    updateFields.color = color;
  }

  try {
    const existingJournal = await journalModel.findById(id);
    if (!existingJournal) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Journal not found with given ID.",
      });
    }

    if (imagesToDelete && imagesToDelete.length > 0) {
      updateFields.images = existingJournal.images.filter(
        (image) => !imagesToDelete.includes(image)
      );
    } else {
      updateFields.images = [...existingJournal.images];
    }

    if (images && images.length > 0) {
      const updatedImages = [...updateFields.images, ...images];
      if (updatedImages.length > 10) {
        updateFields.images = updatedImages.slice(0, 10);
      } else {
        updateFields.images = updatedImages;
      }
    }

    const updatedJournal = await journalModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedJournal) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Journal not found with given ID.",
      });
    }

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Journal updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

export const deleteJournal = async (req, res) => {
  try {
    const journal = await journalModel.findByIdAndDelete(req.params.id);

    if (!journal)
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: "failed",
        message: "Journal not found by given ID.",
      });

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Journal deleted successfully.",
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};

/*

    const hasNextPage = page < totalPages;
    const hasNextPage = page < totalPages;

    // const pagination = {
    //   totalRecords: count,
    //   pageSize: limit,
    //   totalPages,
    //   currentPage: page,
    //   hasNextPage,
    // };

    // .skip(offset)
      // .limit(limit)

     const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
 

      */
