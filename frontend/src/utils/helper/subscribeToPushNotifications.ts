import { getVapidKey } from "../../api";
import { urlBase64ToUint8Array } from "./helperFunctions";

export const subscribeToPushNotifications = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const registration = await navigator.serviceWorker.ready;

    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (existingSubscription) {
      return;
    }

    const { data } = await getVapidKey();
    const vapidPublicKey = data?.vapidPublicKey;

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    console.log("newSubscription", newSubscription);

    // Send the subscription to your server (to send push notifications later)
    // await sendSubscriptionToServer(newSubscription);
  }
};
