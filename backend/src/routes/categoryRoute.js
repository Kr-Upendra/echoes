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

router.route("/").post(protect, createCategory);

export { router as categoryRouter };
