import { deleteNote } from "../api";
import { useDeleteItem } from "../hooks";
import ActionButtons from "./buttons/ActionButtons";

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

      <ActionButtons id={id} isFavorite={isFavorite} />
    </div>
  );
}
