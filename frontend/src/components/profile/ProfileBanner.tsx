import { FaPen } from "react-icons/fa6";
import default_bg_cover from "../../assets/bg/default_cover_image.jpg";
import { useState } from "react";
import { updateProfileImages } from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import UploadFile from "../UploadFile";

export default function ProfileBanner() {
  const [showUploader, setShowUploader] = useState<boolean>(false);
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.userProfile
  );

  const handleUploadClick = () => {
    setShowUploader(true);
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, #005533a5, #00000088), url(${
          userProfile?.profileBanner || default_bg_cover
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-80 md:h-64 sm:h-48 xs:h-40 rounded-lg shadow-2xl shadow-black/20 text-end p-2 mt-5"
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
        <UploadFile
          onClose={() => setShowUploader(false)}
          mutationFunction={updateProfileImages}
          cardTitle="Update your banner image"
          uploadFor="banner"
        />
      )}
    </div>
  );
}
