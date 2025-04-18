import { deleteNote } from "../api";
import { useDeleteItem } from "../hooks";
import { formatDate, INote } from "../utils";
import ActionButtons from "./buttons/ActionButtons";

type Props = {
  note: INote;
};

export default function Card({ note }: Props) {
  const { mutate: deleteNoteMutation } = useDeleteItem(deleteNote, [
    "allNotes",
  ]);

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation(id);
  };

  return (
    <div className="card-diff rounded-lg p-3 group relative border border-green-200/5 hover:border-green-500/20">
      <div className="mb-2">
        <h2 className="text-green-500 font-display line-clamp-1 sm:text-sm">
          {note?.title}
        </h2>
      </div>
      <p className="text-sm sm:text-xs text-gray-500 mb-4 h-20 md:h-17 sm:h-15 line-clamp-4 ">
        {note?.content}
      </p>
      <div className="flex space-x-1">
        {note?.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-white/10 text-gray-100 font-monaco rounded-sm capitalize"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-2.5">
        <span className="text-xs px-2 py-1 bg-white/10 text-gray-100 font-monaco rounded-sm capitalize">
          {formatDate(note.createdAt!)}
        </span>
      </div>

      <ActionButtons
        id={note?._id}
        hasFavorite={true}
        isFavorite={note?.isFavorite}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}
