import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEye, FaHeart, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { updateNote } from "../../api";
import { ApiResponse, errorAlert, successAlert } from "../../utils";

type Props = {
  id: string;
  isFavorite: boolean;
  onDelete: () => void;
};

export default function ActionButtons({ id, isFavorite, onDelete }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (response: ApiResponse) => {
      if (response.status === "success") {
        queryClient.invalidateQueries({ queryKey: ["allNotes"] });
        successAlert(response?.message);
      }
    },
    onError: (error: any) => {
      errorAlert(error?.message);
    },
  });

  const handleFavoriteToggle = () => {
    const updatedFormData = { isFavorite: !isFavorite };
    mutation.mutate({ formdata: updatedFormData, id });
  };

  return (
    <div className="absolute p-2 sm:p-1 top-0 right-0 flex flex-col gap-y-2 -translate-x-full opacity-0 pointer-events-none group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 sm:opacity-100 sm:translate-x-0">
      <button
        onClick={handleFavoriteToggle}
        className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded"
      >
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
