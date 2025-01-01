import { Navigate } from "react-router-dom";
import { Features, Hero, HowItWorks, UserStories } from "../containers";
import { isAuthenticated } from "../utils";

export default function Home() {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace={true} />;
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <UserStories />
    </>
  );
}
