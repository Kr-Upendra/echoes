import { moodOptions } from "../../utils";
type Props = { mood: string };

export default function MoodIcon({ mood }: Props) {
  const moodOption = moodOptions.find((option) => option.value === mood);
  return (
    <div className="relative">
      <span
        className={`w-8 h-8 text-xl py-1 px-1.5 shadow-2xl shadow-green-300/30 rounded-md cursor-pointer transition-all bg-green-200/5`}
      >
        {moodOption?.title}
      </span>
    </div>
  );
}
