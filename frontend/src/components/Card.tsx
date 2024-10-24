import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEye, FaHeart, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { deleteNote } from "../api";
import { ApiResponse, successAlert } from "../utils";

type Props = {
  id: string;
  title: string;
  content: string;
  category: {
    id?: string;
    title?: string;
    slug?: string;
  };
  tags: string[];
  isFavorite: boolean;
};

export default function Card({
  id,
  title,
  content,
  category,
  tags,
  isFavorite,
}: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: (response: ApiResponse) => {
      successAlert(response?.message);
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });

  return (
    <div className="card-diff rounded-lg p-3 group relative">
      <div className="mb-2">
        <h2 className="text-green-500 font-display line-clamp-1 sm:text-sm">
          {title}
        </h2>
      </div>
      <p className="text-sm sm:text-xs text-gray-500 mb-4 h-20 line-clamp-4 md:h-17 sm:h-15">
        {content}
      </p>
      <div className="flex items-center justify-between mb-2">
        <span className="px-2.5 py-0.5 font-display rounded-full text-green-600 border border-green-600 text-xs">
          {category?.title}
        </span>
        <div className="flex space-x-1">
          {tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 bg-white/10 text-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute p-2 sm:p-1 top-0 right-0 flex flex-col gap-y-2 -translate-x-full opacity-0 pointer-events-none group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 sm:opacity-100 sm:translate-x-0">
        <button className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded">
          <FaHeart
            className={`text-lg  sm:text-sm ${
              isFavorite ? "text-green-500" : "text-white"
            }`}
          />
        </button>
        <Link to={id}>
          <button className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded">
            <FaEye className="text-lg sm:text-sm text-white" />
          </button>
        </Link>

        <button
          onClick={() => mutation.mutateAsync(id)}
          className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded"
        >
          <FaTrash className="text-lg sm:text-sm text-white" />
        </button>
      </div>
    </div>
  );
}
