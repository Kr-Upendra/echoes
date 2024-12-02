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
    res.status(201).json({ status: "success", message: "Subscription saved" });
  } catch (error) {
    console.error("Error saving subscription:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Error saving subscription" });
  }
};

export const sendNotification = async (req, res) => {
  try {
    const subscriptions = await SubscriptionModel.find(); // Fetch all subscriptions

    if (subscriptions.length === 0) {
      return res.status(200).json({ message: "No subscriptions found." });
    }

    // Payload to send with the push notification
    const payload = JSON.stringify({
      title: "New Notification!",
      message: "Hello, this is a push notification from the backend.",
      icon: "icon-url.png", // Change to your notification icon URL
      url: "https://your-website.com", // The URL to open on notification click
    });

    // Loop through all subscriptions and send notifications
    for (let i = 0; i < subscriptions.length; i++) {
      const subscription = subscriptions[i];

      // Subscription object needed for sending the notification
      const pushSubscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      };

      try {
        await webPush.sendNotification(pushSubscription, payload);
        console.log(`Notification sent to ${subscription.endpoint}`);
      } catch (error) {
        console.error(
          `Error sending notification to ${subscription.endpoint}:`,
          error
        );
      }
    }

    res
      .status(200)
      .json({
        status: "success",
        message: "Notifications sent to all subscriptions!",
      });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res
      .status(500)
      .json({ message: "Failed to send notifications", error: error.message });
  }
};

// webPush.setVapidDetails(
//     "mailto:your-email@example.com",
//     vapidPublicKey,
//     vapidPrivateKey
//   );
