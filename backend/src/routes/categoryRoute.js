import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  categories,
  category,
} from "../controllers/categoryController.js";
import { protect, restrictTo } from "../middlewares/middleware.js";
const router = express.Router();

router.route("/").post(protect, createCategory).get(protect, categories);
router
  .route("/:id")
  .get(protect, category)
  .patch(protect, updateCategory)
  .delete(protect, deleteCategory);

export { router as categoryRouter };
