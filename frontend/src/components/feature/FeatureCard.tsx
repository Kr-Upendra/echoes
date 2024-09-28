import { Feature } from "../../utils";

type Props = { feature: Feature };

export default function FeatureCard({ feature }: Props) {
  return (
    <div className="flex flex-col items-center relative py-8 px-6 border border-gray-900 rounded-lg shadow-xl shadow-green-500/10 transition-custom">
      <div className="absolute top-6 left-6 sm:top-3 sm:left-3 border-2 p-2 px-3 rounded-full border-green-600">
        <span className="font-display text-green-500 text-xl sm:text-base">
          {feature.index}
        </span>
      </div>
      <div className="w-[60%] object-cover mb-4">
        <img
          src={feature.image}
          alt="Take Notes Icon"
          className="w-full h-full selectDisable"
        />
      </div>
      <h3 className="text-xl text-center font-display mb-2 text-white">
        {feature.title}
      </h3>
      <p className="text-gray-400 text-center max-w-[400px]">
        {feature.shortDescription}
      </p>
    </div>
  );
}
