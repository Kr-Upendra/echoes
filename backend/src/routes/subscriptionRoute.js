import express from "express";
const router = express.Router();
import {
  getVapidKey,
  saveSubscription,
} from "../controllers/subscriptionController.js";

router.route("/vapid-key").get(getVapidKey);
router.route("/subscribe").post(saveSubscription);

export { router as subscriptionRouter };
