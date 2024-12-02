import { useEffect } from "react";
import { Features, Hero, HowItWorks, UserStories } from "../containers";
import { subscribeToPushNotifications } from "../utils";

export default function Home() {
  // useEffect(() => {
  //   // Check if the browser supports service workers and push notifications
  //   if ("serviceWorker" in navigator && "PushManager" in window) {
  //     // Register the service worker
  //     navigator.serviceWorker
  //       .register("/registerSW.js")
  //       .then((registration) => {
  //         console.log(
  //           "Service Worker registered with scope:",
  //           registration.scope
  //         );

  //         // Call the function to subscribe the user to push notifications
  //         // subscribeToPushNotifications(registration);
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Notification.permission === "default") {
        setTimeout(async () => {
          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            console.log("Notification permission granted.");
            subscribeToPushNotifications();
          } else {
            console.log("Notification permission denied.");
          }
        }, 3000);
      }
    };

    const handleScroll = () => {
      requestNotificationPermission();
      window.removeEventListener("scroll", handleScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Send subscription object to your server (backend)
  // const sendSubscriptionToServer = async (subscription: PushSubscription) => {
  //   const response = await fetch("/api/subscribe", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(subscription),
  //   });

  //   if (!response.ok) {
  //     console.error("Failed to send subscription to server");
  //   }
  // };

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <UserStories />
    </>
  );
}
