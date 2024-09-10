import SectionHeading from "../components/common/SectionHeading";
import FeatureCard from "../components/feature/FeatureCard";
import { Feature, features } from "../utils";

export default function Features() {
  return (
    <section id="feature" className="my-4 py-12 base-paddings">
      <div className="container mx-auto text-center">
        <SectionHeading
          title="Feature Overview"
          description="Explore key features to capture and organize your thoughts with ease."
        />
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-8 my-12">
          {features.map((feature: Feature) => (
            <FeatureCard key={feature.index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
