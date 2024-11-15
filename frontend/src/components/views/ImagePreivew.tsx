import { FaXmark } from "react-icons/fa6";

type Props = {
  image: string;
  imageName?: string;
  containerStyles?: string;
} & (
  | {
      hasRemoveFn: true;
      handleRemove: (image: string) => void;
    }
  | {
      hasRemoveFn?: false;
      handleRemove?: never;
    }
);

export default function ImagePreview({
  image,
  imageName,
  hasRemoveFn = false,
  handleRemove,
  containerStyles,
}: Props) {
  return (
    <div
      className={`rounded-lg relative p-[1px] bg-green-200/20 backdrop-blur-sm ${
        containerStyles ? containerStyles : "w-12 h-12 sm:w-8 sm:h-8"
      }`}
    >
      <img
        src={image}
        alt={imageName}
        className="w-full h-full object-cover rounded-lg"
      />
      {hasRemoveFn && handleRemove && (
        <button
          type="button"
          className="bg-green-500/30 z-10 p-1 rounded-full backdrop-blur-sm absolute -top-2 -right-2 sm:-top-1.5 sm:-right-1.5 sm:p-0.5 shadow-lg"
          onClick={() => handleRemove(image)}
        >
          <FaXmark className="text-white text-sm sm:text-xs" />
        </button>
      )}
    </div>
  );
}
