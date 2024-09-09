import FeatureCard from "../components/feature/FeatureCard";
import { Feature, features } from "../utils";

export default function Features() {
  return (
    <section className="text-text-real py-12 base-paddings">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-primary-real">
          Feature Overview
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-1 gap-8 my-12">
          {features.map((feature: Feature) => (
            <FeatureCard key={feature.index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
