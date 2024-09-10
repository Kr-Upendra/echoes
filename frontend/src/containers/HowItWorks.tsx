import SectionHeading from "../components/common/SectionHeading";
import HowItWorkCard from "../components/howItWork/HowItWorkCard";
import { HowItWork, howItWorks } from "../utils";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="base-paddings mb-14">
      <div className="container">
        <SectionHeading
          title="How It Works"
          description="Learn how to easily capture, organize, and revisit your notes and memories in just a few steps."
        />

        <div className="grid grid-cols-2 sm:grid-cols-1 my-4 gap-8 sm:gap-y-8 flex-wrap">
          {howItWorks.map((howItWork: HowItWork) => (
            <HowItWorkCard howItWork={howItWork} key={howItWork?.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
