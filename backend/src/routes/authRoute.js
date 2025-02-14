import express from "express";
import {
  check,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middlewares/middleware.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(protect, logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").patch(resetPassword);
router.route("/check").get(protect, check);

export { router as authRouter };
