import express from "express";
const router = express.Router();
import { protect } from "../middlewares/middleware.js";
import {
  createJournal,
  getJournal,
  getAllJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";

router.route("/").post(protect, createJournal).get(protect, getAllJournal);

router
  .route("/:id")
  .get(protect, getJournal)
  .patch(protect, updateJournal)
  .delete(protect, deleteJournal);

export { router as journalRouter };
