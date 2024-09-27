import { Link } from "react-router-dom";

type Props = { hrefValue: string; title: string };

export default function LinkButton({ hrefValue, title }: Props) {
  return (
    <>
      <Link to={hrefValue}>
        <button className="border py-2 px-6 border-green-500 text-green-500 font-display tracking-wider rounded-full hover:bg-green-600 hover:text-white transition-color duration-300">
          {title}
        </button>
      </Link>
    </>
  );
}
