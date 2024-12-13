import { FaXmark } from "react-icons/fa6";
import IconButton from "../../components/buttons/IconButton";
import { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModelContainer({ onClose, children }: Props) {
  const modalRef: any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <IconButton
        icon={FaXmark}
        onClick={onClose}
        buttonStyle="absolute top-4 right-4 sm:top-6 sm:right-6 text-white bg-green-200/30 p-2 rounded-full hover:bg-orange-600 transition-color"
      />
      <div ref={modalRef} className="relative w-full max-w-lg big-shadow">
        {children}
      </div>
    </div>
  );
}
