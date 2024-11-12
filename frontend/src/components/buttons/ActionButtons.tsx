import { FaEye, FaHeart, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { updateNote } from "../../api";
import { useUpdateItem } from "../../hooks";
import { NoteFormData } from "../../utils";

type Props = {
  id: string;
  onDelete?: (id: string) => void;
} & (
  | {
      hasFavorite: true;
      isFavorite: boolean;
    }
  | {
      hasFavorite?: false;
      isFavorite?: never;
    }
);

export default function ActionButtons({
  id,
  onDelete,
  hasFavorite = false,
  isFavorite,
}: Props) {
  const { mutate: updateNoteMutation } = useUpdateItem<NoteFormData>(
    updateNote,
    ["allNotes"]
  );

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleNoteUpdate = () => {
    const updatedFormData = { isFavorite: !isFavorite };
    updateNoteMutation({ id, formdata: updatedFormData });
  };

  return (
    <div className="absolute p-2 sm:p-1 top-0 right-0 flex flex-col gap-y-2 -translate-x-full opacity-0 pointer-events-none group-hover:translate-x-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 sm:opacity-100 sm:translate-x-0">
      {hasFavorite && (
        <button
          onClick={handleNoteUpdate}
          className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded"
        >
          <FaHeart
            className={`text-lg  sm:text-sm ${
              isFavorite ? "text-green-500" : "text-white"
            }`}
          />
        </button>
      )}
      <Link to={id}>
        <button className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded">
          <FaEye className="text-lg sm:text-sm text-white" />
        </button>
      </Link>

      <button
        aria-label="Delete"
        onClick={handleDelete}
        className="cursor-pointer bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded"
      >
        <FaTrash className="text-lg sm:text-sm text-white" />
      </button>
    </div>
  );
}
