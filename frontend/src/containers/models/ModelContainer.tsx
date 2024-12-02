import { FaXmark } from "react-icons/fa6";
import IconButton from "../../components/buttons/IconButton";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  children: React.ReactNode;
};

export default function ModelContainer({ isOpen, onCancel, children }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 px-10 py-6 backdrop-blur-sm sm:px-4">
      <button
        onClick={onCancel}
        className="text-end absolute top-8 right-12 sm:top-4 sm:right-6"
      >
        <IconButton icon={FaXmark} />
      </button>
      {children}
    </div>
  );
}
