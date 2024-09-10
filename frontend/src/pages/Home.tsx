import Features from "../containers/Features";
import Hero from "../containers/Hero";
import HowItWorks from "../containers/HowItWorks";
import UserStories from "../containers/UserStories";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <UserStories />
    </>
  );
}
