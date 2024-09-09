import { Feature } from "../../utils";

type Props = { feature: Feature };

export default function FeatureCard({ feature }: Props) {
  return (
    <div className="flex flex-col items-center relative py-8 px-6 border border-accent-alpha rounded-lg transition-custom">
      <div className="absolute top-6 left-6 sm:top-3 sm:left-3 border p-2 px-3 rounded-full border-primary-alpha">
        <span className="font-semibold text-xl sm:text-base">
          {feature.index}
        </span>
      </div>
      <div className="w-[60%] object-cover mb-4">
        <img
          src={feature.image}
          alt="Take Notes Icon"
          className="w-full h-full"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-accent-real">
        {feature.title}
      </h3>
      <p className="text-secondary-light max-w-[400px]">
        {feature.shortDescription}
      </p>
    </div>
  );
}
