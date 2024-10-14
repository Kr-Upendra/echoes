import { FaPen } from "react-icons/fa6";
import default_bg_cover from "../../assets/bg/default_cover_image.jpg";
import { useState } from "react";
import ImageUploader from "../uploader/FileUploader";

export default function ProfileBanner() {
  const [showUploader, setShowUploader] = useState<boolean>(false);

  const handleUploadClick = () => {
    setShowUploader(true);
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(34, 197, 94, 0.4), #000000a1), url(${default_bg_cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-80 md:h-64 sm:h-48 xs:h-40 rounded-lg shadow-2xl shadow-black/20 text-end p-2"
    >
      <button
        onClick={handleUploadClick}
        className="bg-green-500 text-white shadow-xl shadow-black/20 cursor-pointer rounded-full p-3"
      >
        <span>
          <FaPen />
        </span>
      </button>

      {showUploader && (
        <ImageUploader
          onClose={() => setShowUploader(false)} // Pass a function to close the uploader
        />
      )}
    </div>
  );
}
