import webPush from "web-push";
import { SubscriptionModel } from "../models/subscriptionModel.js";

export const getVapidKey = (req, res) => {
  const { publicKey } = webPush.generateVAPIDKeys();

  res.status(200).json({
    status: "success",
    message: "Vapid Key",
    data: { vapidPublicKey: publicKey },
  });
};

export const saveSubscription = async (req, res) => {
  const { endpoint, expirationTime, keys } = req.body;

  const subscription = new SubscriptionModel({
    endpoint,
    expirationTime,
    keys,
  });

  try {
    await subscription.save();
    res.status(201).json({ message: "Subscription saved" });
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ message: "Error saving subscription" });
  }
};

// webPush.setVapidDetails(
//     "mailto:your-email@example.com",
//     vapidPublicKey,
//     vapidPrivateKey
//   );
