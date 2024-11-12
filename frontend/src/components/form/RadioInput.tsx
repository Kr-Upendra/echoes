import Tooltip from "../common/Tooltip";

type Props = {
  title: string;
  value: string;
  name: string;
  idFor: string;
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
} & (
  | {
      hasTooltip: true;
      tooltipTitle: string;
      tooltipPosition?: "left" | "right" | "top" | "bottom";
    }
  | {
      hasTooltip?: false;
      tooltipTitle?: never;
      tooltipPosition?: never;
    }
);

export default function RadioInput({
  title,
  value,
  name,
  idFor,
  hasTooltip = false,
  tooltipTitle,
  tooltipPosition,
  selectedMood,
  setSelectedMood,
}: Props) {
  return (
    <div className="relative group">
      <input
        type="radio"
        id={idFor}
        name={name}
        value={value}
        checked={selectedMood === value}
        onChange={() => setSelectedMood(value)}
        className="hidden peer"
      />
      <label
        htmlFor={idFor}
        className={`text-2xl py-1.5 px-2 rounded-md cursor-pointer transition-all
            ${
              selectedMood === value
                ? "bg-green-300/30 scale-110 text-red-500"
                : "bg-green-200/5"
            }
          `}
      >
        {title}
      </label>
      {hasTooltip && tooltipTitle && (
        <Tooltip title={tooltipTitle} position={tooltipPosition} />
      )}
    </div>
  );
}
