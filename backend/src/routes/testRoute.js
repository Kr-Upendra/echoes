import express from "express";
import { testEmail } from "../controllers/testController.js";
const router = express.Router();

router.route("/email").get(testEmail);

export { router as testRouter };
