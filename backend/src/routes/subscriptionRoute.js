import express from "express";
const router = express.Router();
import {
  getVapidKey,
  saveSubscription,
  sendNotification,
} from "../controllers/subscriptionController.js";

router.route("/vapid-key").get(getVapidKey);
router.route("/subscribe").post(saveSubscription);
router.route("/send-notification").post(sendNotification);

export { router as subscriptionRouter };
