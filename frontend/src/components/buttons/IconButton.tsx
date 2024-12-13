import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  onClick?: () => void;
  buttonStyle?: string;
};

export default function IconButton({
  icon: Icon,
  onClick,
  buttonStyle = "border border-green-500/30 p-2 hover:bg-green-500/70 sm:p-1.5",
}: Props) {
  return (
    <>
      <button
        type="button"
        className={`rounded-full ${buttonStyle}`}
        onClick={onClick}
        aria-label="icon-button"
      >
        <Icon className="text-xl text-white sm:text-base" />
      </button>
    </>
  );
}
