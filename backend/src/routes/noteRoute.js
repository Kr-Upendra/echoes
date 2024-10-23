import express from "express";
import { createNote, getNotes } from "../controllers/noteController.js";
import { protect } from "../middlewares/middleware.js";
const router = express.Router();

router.route("/").post(protect, createNote).get(protect, getNotes);
// router
//   .route("/:id")
//   .get(protect, category)
//   .patch(protect, updateCategory)
//   .delete(protect, deleteCategory);

export { router as noteRouter };
