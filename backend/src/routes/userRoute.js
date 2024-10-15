import express from "express";
import { getUsers, updatePassword } from "../controllers/userController.js";
import { protect, restrictTo } from "../middlewares/middleware.js";
const router = express.Router();

router.route("/update-password").post(protect, updatePassword);
router.route("/").get(protect, restrictTo("admin"), getUsers);

export { router as userRouter };
