import express from "express";
import { getUsers } from "../controllers/userController.js";
import { protect, restrictTo } from "../middlewares/middleware.js";
const router = express.Router();

router.route("/").get(protect, getUsers);

export { router as userRouter };
