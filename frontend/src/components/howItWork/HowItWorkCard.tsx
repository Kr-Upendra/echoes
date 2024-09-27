import { HowItWork } from "../../utils";

type Props = { howItWork: HowItWork };

export default function HowItWorkCard({ howItWork }: Props) {
  return (
    <div className="border border-gray-900 sm:w-full shadow-xl shadow-green-500/10 rounded-md p-5">
      <div className="flex gap-x-3 mb-3 items-center">
        <span className="border-2 font-display text-green-500 px-2 py-1 rounded-full border-green-500">
          {howItWork?.index}
        </span>
        <h2 className="font-display text-white">{howItWork?.title}</h2>
      </div>
      <p className="text-gray-400">{howItWork?.description}</p>
    </div>
  );
}
