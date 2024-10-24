import { FaEye, FaHeart, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Props = {
  id: string;
  isFavorite: boolean;
  onDelete: () => void;
};

export default function ActionButtons({ id, isFavorite, onDelete }: Props) {
  return (
    <div className="absolute p-2 sm:p-1 top-0 right-0 flex flex-col gap-y-2 -translate-x-full opacity-0 pointer-events-none group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 sm:opacity-100 sm:translate-x-0">
      <button className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded">
        <FaHeart
          className={`text-lg  sm:text-sm ${
            isFavorite ? "text-green-500" : "text-white"
          }`}
        />
      </button>
      <Link to={id} aria-label="Hello">
        <button className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded">
          <FaEye className="text-lg sm:text-sm text-white" />
        </button>
      </Link>

      <button
        aria-label="Delete"
        onClick={onDelete}
        className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded"
      >
        <FaTrash className="text-lg sm:text-sm text-white" />
      </button>
    </div>
  );
}
