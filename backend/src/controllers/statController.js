import { noteModel } from "../models/noteModel.js";
import { journalModel } from "../models/journalModel.js";
import {
  API_RESPONSE_MESSAGE,
  STATUS_CODES,
  getStartAndEndMonth,
} from "../utils/index.js";
import mongoose from "mongoose";

export const getStat = async (req, res) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const userObjectId = new mongoose.Types.ObjectId(req.user.id);

  try {
    const memoriesStats = await noteModel.aggregate([
      {
        $match: { author: userObjectId }, // Filter by user (author)
      },
      {
        $facet: {
          totalMemories: [
            {
              $count: "totalMemories", // Count total journals for the user
            },
          ],
          favoriteMemories: [
            {
              $match: { isFavorite: true }, // Filter for favorite journals
            },
            {
              $count: "favoriteMemories", // Count the favorite journals
            },
          ],
          uniqueTags: [
            {
              $unwind: "$tags", // Unwind the tags array to count each tag individually
            },
            {
              $group: {
                _id: null,
                uniqueTags: { $addToSet: "$tags" }, // Add tags to a set (removes duplicates)
              },
            },
            {
              $project: {
                _id: 0,
                uniqueTagsCount: { $size: "$uniqueTags" }, // Count the number of unique tags
              },
            },
          ],
          totalMemoriesInTheCurrentMonth: [
            {
              $match: { createdAt: { $gte: firstDayOfMonth } },
            },
            {
              $count: "totalMemoriesInTheCurrentMonth", // Count journals created in the current month
            },
          ],
        },
      },
      {
        $project: {
          totalMemories: { $arrayElemAt: ["$totalMemories.totalMemories", 0] },
          favoriteMemories: {
            $arrayElemAt: ["$favoriteMemories.favoriteMemories", 0],
          },
          uniqueTagsCount: { $arrayElemAt: ["$uniqueTags.uniqueTagsCount", 0] },
          memoriesCreatedInCurrentMonth: {
            $arrayElemAt: [
              "$totalMemoriesInTheCurrentMonth.totalMemoriesInTheCurrentMonth",
              0,
            ],
          },
        },
      },
    ]);

    const journalStat = await journalModel.aggregate([
      {
        $match: { user: userObjectId },
      },
      {
        $facet: {
          totalImages: [
            {
              $project: {
                totalImages: { $size: "$images" },
              },
            },
            {
              $group: {
                _id: null,
                totalImagesUploaded: { $sum: "$totalImages" },
              },
            },
          ],
          totalJournalCount: [
            {
              $count: "totalJournalCount",
            },
          ],
          totalJournalCurrentMonthCount: [
            {
              $match: { createdAt: { $gte: firstDayOfMonth } },
            },
            {
              $count: "totalJournalCurrentMonthCount",
            },
          ],
          lastJournal: [
            {
              $sort: { createdAt: -1 },
            },
            {
              $limit: 1,
            },
            {
              $project: {
                streak: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          totalImages: {
            $arrayElemAt: ["$totalImages.totalImagesUploaded", 0],
          },
          totalJournals: {
            $arrayElemAt: ["$totalJournalCount.totalJournalCount", 0],
          },
          journalsCreatedInCurrentMonth: {
            $arrayElemAt: [
              "$totalJournalCurrentMonthCount.totalJournalCurrentMonthCount",
              0,
            ],
          },
          streak: {
            $arrayElemAt: ["$lastJournal.streak", 0],
          },
        },
      },
    ]);

    const statData = {
      memoryStats: {
        totalMemories: memoriesStats[0].totalMemories,
        favoriteMemories: memoriesStats[0].favoriteMemories,
        uniqueTags: memoriesStats[0].uniqueTagsCount,
        memoriesCreatedInCurrentMonth:
          memoriesStats[0].memoriesCreatedInCurrentMonth,
      },
      journalStats: {
        totalJournals: journalStat[0].totalJournals,
        totalImages: journalStat[0].totalImages,
        currentStreak: journalStat[0].streak,
        journalsCreatedInCurrentMonth:
          journalStat[0].journalsCreatedInCurrentMonth,
      },
    };

    return res.status(STATUS_CODES.SUCCESS).json({
      status: "success",
      message: "Your stats",
      data: statData,
    });
  } catch (err) {
    console.log(err);
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: API_RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
    });
  }
};
