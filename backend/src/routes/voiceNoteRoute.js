import express from "express";

import { protect } from "../middlewares/middleware.js";
import {
  createVoiceNote,
  deleteVoiceNote,
  updateVoiceNote,
  voiceNote,
  voiceNotes,
} from "../controllers/voiceNoteController.js";
const router = express.Router();

router.route("/").post(protect, createVoiceNote).get(protect, voiceNotes);
router
  .route("/:id")
  .get(protect, voiceNote)
  .patch(protect, updateVoiceNote)
  .delete(protect, deleteVoiceNote);

export { router as voiceNoteRouter };
