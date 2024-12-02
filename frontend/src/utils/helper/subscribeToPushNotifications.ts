import { getVapidKey, sendSubscription } from "../../api";
import { arrayBufferToBase64, urlBase64ToUint8Array } from "./helperFunctions";

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

    const p256dh = newSubscription.getKey("p256dh");
    const auth = newSubscription.getKey("auth");

    const p256dhBase64 = arrayBufferToBase64(p256dh!);
    const authBase64 = arrayBufferToBase64(auth!);

    const dataToSend = {
      endpoint: newSubscription.endpoint,
      expirationTime: newSubscription.expirationTime,
      keys: {
        p256dh: p256dhBase64,
        auth: authBase64,
      },
    };

    await sendSubscription(dataToSend);
  }
};
