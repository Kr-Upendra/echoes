type Props = { title: string; position?: "left" | "right" | "top" | "bottom" };

export default function Tooltip({ title, position = "top" }: Props) {
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2.5",
    right: "top-1/2 left-full transform -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2.5",
    left: "top-1/2 right-full transform -translate-y-1/2 mr-2",
  };

  return (
    <span
      className={`absolute opacity-0 group-hover:opacity-100 bg-green-200/10 backdrop-blur-sm text-white font-monaco text-xs rounded-md py-1 px-2 transition-opacity duration-300 capitalize font-semibold ${positionClasses[position]}`}
    >
      {title}
    </span>
  );
}
