import { noteModel } from "../models/noteModel.js";
import { API_RESPONSE_MESSAGE, STATUS_CODES } from "../utils/index.js";

export const getStat = async (req, res) => {
  const userId = req.user.id;

  try {
    const totalMemories = await noteModel.countDocuments({ author: userId });

    const favoriteMemories = await noteModel.countDocuments({
      author: userId,
      isFavorite: true,
    });

    const categories = await noteModel.distinct("category", { author: userId });
    const totalCategories = categories.length;

    // Monthly, weekly, and daily counts of notes
    const today = new Date();
    const dailyCount = await noteModel.countDocuments({
      author: userId,
      createdAt: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
      },
    });
    const weeklyCount = await noteModel.countDocuments({
      author: userId,
      createdAt: {
        $gte: new Date(today.setDate(today.getDate() - 7)),
      },
    });
    const monthlyCount = await noteModel.countDocuments({
      author: userId,
      createdAt: {
        $gte: new Date(today.setMonth(today.getMonth() - 1)),
      },
    });

    const tags = await noteModel.distinct("tags", { author: userId });
    const uniqueTags = [...new Set(tags.flat())];
    const totalUniqueTags = uniqueTags.length;

    const responseData = {
      totalMemories,
      favoriteMemories,
      totalCategories,
      monthlyCount,
      weeklyCount,
      dailyCount,
      totalUniqueTags,
    };

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Your stats",
      data: responseData,
    });
  } catch (err) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
