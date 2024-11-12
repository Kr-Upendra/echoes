import { moodOptions } from "../../utils";
import RadioInput from "./RadioInput";

type Props = { selectedMood: string; setSelectedMood: (mood: string) => void };

export default function MoodInput({ selectedMood, setSelectedMood }: Props) {
  return (
    <div className="mt-2 mb-3.5 w-full">
      <label
        className="block mb-1 text-sm font-medium text-gray-200 capitalize"
        htmlFor="mood-input"
      >
        How are you feeling ?
      </label>
      <div className="flex justify-start py-2 gap-6">
        {moodOptions.map(({ title, value, idFor, tooltipTitle }) => (
          <RadioInput
            key={value}
            title={title}
            name="mood"
            idFor={idFor}
            value={value}
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
            hasTooltip={true}
            tooltipTitle={tooltipTitle}
          />
        ))}
      </div>
    </div>
  );
}
