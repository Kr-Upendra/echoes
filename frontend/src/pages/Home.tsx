import { useEffect } from "react";
import { Features, Hero, HowItWorks, UserStories } from "../containers";
import { subscribeToPushNotifications } from "../utils";

export default function Home() {
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

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <UserStories />
    </>
  );
}
