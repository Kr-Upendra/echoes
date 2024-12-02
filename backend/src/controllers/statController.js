import { noteModel } from "../models/noteModel.js";
import { journalModel } from "../models/journalModel.js";
import {
  API_RESPONSE_MESSAGE,
  STATUS_CODES,
  getStartAndEndMonth,
} from "../utils/index.js";

export const getStat = async (req, res) => {
  const { startOfMonth, endOfMonth } = getStartAndEndMonth();
  const userId = req.user.id;

  try {
    const totalMemories = await noteModel.countDocuments({ author: userId });
    const categories = await noteModel.distinct("category", { author: userId });
    const totalCategories = categories.length;
    const favoriteMemories = await noteModel.countDocuments({
      author: userId,
      isFavorite: true,
    });
    const memoriesCreatedInCurrentMonth = await noteModel.countDocuments({
      author: userId,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    const totalJournals = await journalModel.countDocuments({ user: userId });
    const journalsCreatedInCurrentMonth = await journalModel.countDocuments({
      user: userId,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    const statData = {
      memoryStats: {
        totalMemories,
        favoriteMemories,
        totalCategories,
        memoriesCreatedInCurrentMonth,
      },
      journalStats: {
        totalJournals,
        totalImages: 0,
        currentStreak: 1,
        journalsCreatedInCurrentMonth,
      },
    };

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Your stats",
      data: statData,
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
