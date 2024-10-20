import { FaEye, FaHeart, FaTrash } from "react-icons/fa6";

type Props = {
  title: string;
  content: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
};

export default function Card({
  title,
  content,
  category,
  tags,
  isFavorite,
}: Props) {

console.log(title, content, category, tags, isFavorite);
  return (
    <div className="card-diff rounded-lg p-4 group relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-green-500 font-display line-clamp-1 sm:text-sm">
          Lorem ipsum dolor sit amet consectet
        </h2>
      </div>
      <p className="line-clamp-3 text-sm sm:text-xs text-gray-500 mb-4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium
        tenetur quasi, minima eveniet vitae quo, nobis culpa porro perspiciatis
        maiores explicabo earum sint beatae, non iure odio laborum adipisci
        debitis!
      </p>
      <div className="flex items-center justify-between mb-2">
        <span className="px-2.5 py-0.5 font-display rounded-full text-green-600 border border-green-600 text-xs">
          Work
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
        <button className="bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded">
          <FaHeart
            className={`text-lg  sm:text-sm ${
              isFavorite ? "text-green-500" : "text-white"
            }`}
          />
        </button>
        <button className="bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded">
          <FaEye className="text-lg sm:text-sm text-white" />
        </button>
        <button className="bg-green-600/20 w-8 h-8 sm:w-6 sm:h-6 flex justify-center items-center rounded-md sm:rounded">
          <FaTrash className="text-lg sm:text-sm text-white" />
        </button>
      </div>
    </div>
  );
}

//  flex justify-between items-center opacity-100 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300
