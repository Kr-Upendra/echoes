import {
  FaFacebook,
  FaFirefoxBrowser,
  FaInstagram,
  FaPen,
  FaThreads,
  FaTwitter,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import default_user from "../../assets/icons/default_user.png";
import { RootState } from "../../state";
import { useState } from "react";
import ImageUploader from "../../components/uploader/FileUploader";

export default function ProfileCard() {
  const location = useLocation();
  const [showUploader, setShowUploader] = useState<boolean>(false);
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.userProfile
  );

  const handleUploadClick = () => {
    setShowUploader(true);
  };

  return (
    <div className="py-10 h-full px-4 w-[50%] lg:w-full bg-black/80 shadow-2xl shadow-green-500/20 rounded-lg">
      <div className="mx-auto relative w-32 aspect-square rounded-full border-2 border-green-500 p-1 flex justify-center items-center">
        <img
          className="rounded-full"
          src={userProfile?.profilePicture || default_user}
          alt="Default User"
        />
        <button
          onClick={handleUploadClick}
          className="absolute cursor-pointer bottom-0 right-0 p-2 rounded-full bg-green-500"
        >
          <FaPen className="text-black" />
        </button>
      </div>
      <div className="text-center mt-3">
        <h1 className="text-white font-display">{`${userProfile?.firstName} ${userProfile?.lastName}`}</h1>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="p-3 py-4 rounded-lg bg-green-200/5 text-center shadow-lg shadow-black/5">
          <div className="my-2">
            <span className="text-4xl sm:text-3xl text-white font-display tracking-wider">
              <CountUp start={0} end={20} duration={2.5} />
            </span>
          </div>
          <h3 className="text-gray-400 sm:text-sm">Total Notes</h3>
        </div>
        <div className="p-3 py-4 rounded-lg bg-green-200/5 text-center shadow-lg shadow-black/5">
          <div className="my-2">
            <span className="text-4xl sm:text-3xl text-white font-display tracking-wider">
              <CountUp start={0} end={15} duration={2.5} />
            </span>
          </div>
          <h3 className="text-gray-400 sm:text-sm">Total Reminders</h3>
        </div>
        <div className="p-3 py-4 rounded-lg bg-green-200/5 text-center shadow-lg shadow-black/5">
          <div className="my-2">
            <span className="text-4xl sm:text-3xl text-white font-display tracking-wider">
              <CountUp start={0} end={5} duration={2.5} />
            </span>
          </div>
          <h3 className="text-gray-400 sm:text-sm">Voice Notes</h3>
        </div>
        <div className="p-3 py-4 rounded-lg bg-green-200/5 text-center shadow-lg shadow-black/5">
          <div className="my-2">
            <span className="text-4xl sm:text-3xl text-white font-display tracking-wider">
              <CountUp start={0} end={8} duration={2.5} />
            </span>
          </div>
          <h3 className="text-gray-400 sm:text-sm">Photes Added</h3>
        </div>
      </div>
      <div className="mt-4 flex gap-4 sm:gap-2">
        <Link
          to={userProfile?.socialMedia?.facebook || location.pathname}
          className="w-full p-2"
          target="_blank"
        >
          <FaFacebook className="mx-auto text-2xl text-green-500" />
        </Link>
        <Link
          to={userProfile?.socialMedia?.thread || location.pathname}
          className="w-full p-2"
          target="_blank"
        >
          <FaThreads className="mx-auto text-2xl text-green-500" />
        </Link>
        <Link
          to={userProfile?.socialMedia?.thread || location.pathname}
          className="w-full p-2"
          target="_blank"
        >
          <FaInstagram className="mx-auto text-2xl text-green-500" />
        </Link>
        <Link
          to={userProfile?.socialMedia?.thread || location.pathname}
          className="w-full p-2"
          target="_blank"
        >
          <FaTwitter className="mx-auto text-2xl text-green-500" />
        </Link>
        <Link
          to={userProfile?.socialMedia?.thread || location.pathname}
          className="w-full p-2"
          target="_blank"
        >
          <FaFirefoxBrowser className="mx-auto text-2xl text-green-500" />
        </Link>
      </div>

      {showUploader && (
        <ImageUploader
          onClose={() => setShowUploader(false)} // Pass a function to close the uploader
        />
      )}
    </div>
  );
}
