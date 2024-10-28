import { IconType } from "react-icons";

type Props = {
  handleClick: () => void;
  Icon: IconType;
  hasText?: boolean;
  textValue?: string;
};

export default function AudioButton({
  handleClick,
  Icon,
  hasText = false,
  textValue,
}: Props) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`p-2.5 sm:p-2 bg-gradient-to-b from-green-400/20 to-green-600/20 rounded-full ${
        hasText && "flex items-center gap-x-2"
      }`}
    >
      <Icon className="text-white text-2xl mx-auto sm:text-xl" />
      {hasText && (
        <span className="font-display text-white tracking-wider">
          {textValue}
        </span>
      )}
    </button>
  );
}
