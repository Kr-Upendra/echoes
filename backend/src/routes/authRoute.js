import express from "express";
import { check, login, register } from "../controllers/authController.js";
import { protect, restrictTo } from "../middlewares/middleware.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/check").get(protect, check);

export { router as authRouter };
