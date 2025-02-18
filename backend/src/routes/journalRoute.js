import express from "express";
const router = express.Router();
import { protect } from "../middlewares/middleware.js";
import {
  addNewJournal,
  getJournal,
  getAllJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";
import { uploadMultipleFiles } from "../utils/index.js";

router
  .route("/")
  .post(protect, uploadMultipleFiles, addNewJournal)
  .get(protect, getAllJournal);

router
  .route("/:id")
  .get(protect, getJournal)
  .patch(protect, updateJournal)
  .delete(protect, deleteJournal);

export { router as journalRouter };
