import { HowItWork } from "../../utils";

type Props = { howItWork: HowItWork };

export default function HowItWorkCard({ howItWork }: Props) {
  return (
    <div className="border sm:w-full border-accent-alpha rounded-md p-5">
      <div className="flex gap-x-3 mb-3 items-center">
        <span className="border px-2 py-1 rounded-full border-accent-alpha">
          {howItWork?.index}
        </span>
        <h2 className="font-semibold text-text-real">{howItWork?.title}</h2>
      </div>
      <p className="text-secondary-light">{howItWork?.description}</p>
    </div>
  );
}
