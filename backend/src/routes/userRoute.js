import express from "express";
import {
  getUsers,
  updatePassword,
  updateProfile,
  userProfile,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../middlewares/middleware.js";
import { getStat } from "../controllers/statController.js";
import { uploadFilesWithFields } from "../utils/index.js";
const router = express.Router();

router.route("/").get(protect, restrictTo("admin"), getUsers);
router.route("/profile").get(protect, userProfile);
router.route("/stat").get(protect, getStat);
router.route("/update-password").post(protect, updatePassword);
router
  .route("/update-profile")
  .patch(protect, uploadFilesWithFields, updateProfile);

export { router as userRouter };
