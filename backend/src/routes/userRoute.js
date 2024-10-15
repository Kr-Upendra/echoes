import express from "express";
import {
  getUsers,
  updatePassword,
  userProfile,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../middlewares/middleware.js";
const router = express.Router();

router.route("/").get(protect, restrictTo("admin"), getUsers);
router.route("/profile").get(protect, userProfile);
router.route("/update-password").post(protect, updatePassword);

export { router as userRouter };
