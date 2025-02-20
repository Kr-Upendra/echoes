import { Link } from "react-router-dom";

type Props = { hrefValue?: string; title: string; isDisabled?: boolean };

export default function LinkButton({
  hrefValue = "#",
  title,
  isDisabled,
}: Props) {
  return (
    <>
      <Link to={hrefValue}>
        <button
          className={`border py-2 px-6 border-green-500 text-green-500 font-display tracking-wider rounded-full transition-color duration-300 ${
            isDisabled
              ? "bg-green-500/10 cursor-default hover:bg-green-500/10 hover:text-green-500"
              : "hover:bg-green-600 hover:text-white"
          }`}
          disabled={isDisabled}
        >
          {title}
        </button>
      </Link>
    </>
  );
}
