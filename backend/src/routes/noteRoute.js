import express from "express";
import {
  createNote,
  deleteNote,
  notes,
  note,
  updateNote,
} from "../controllers/noteController.js";
import { protect } from "../middlewares/middleware.js";
const router = express.Router();

router.route("/").post(protect, createNote).get(protect, notes);
router
  .route("/:id")
  .get(protect, note)
  .patch(protect, updateNote)
  .delete(protect, deleteNote);

export { router as noteRouter };
