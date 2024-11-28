import { FaXmark } from "react-icons/fa6";
import IconButton from "../../components/buttons/IconButton";

export default function ModelContainer() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 px-10 py-6 backdrop-blur-sm">
      <div className="text-end">
        <IconButton icon={FaXmark} />
      </div>
    </div>
  );
}
