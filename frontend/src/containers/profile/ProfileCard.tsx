import {
  FaFacebook,
  FaFirefoxBrowser,
  FaInstagram,
  FaPen,
  FaThreads,
  FaTwitter,
} from "react-icons/fa6";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import default_user from "../../assets/icons/default_user.png";
import { RootState } from "../../state";
import { useState } from "react";
import ImageUploader from "../../components/uploader/FileUploader";
import { updateProfile } from "../../api";
import { userProfileImageProperties } from "../../utils";

export default function ProfileCard() {
  const location = useLocation();
  const currentPath = location?.pathname;
  const [showUploader, setShowUploader] = useState<boolean>(false);
  const userProfile = useSelector(
    (state: RootState) => state.userProfile.userProfile
  );

  const { userStats: userStatsData }: any = useLoaderData();

  const handleUploadClick = () => {
    setShowUploader(true);
  };

  return (
    <div className="py-10 h-full px-4 w-[50%] lg:w-full bg-black/80 shadow-2xl shadow-green-500/20 rounded-lg">
      <div className="mx-auto relative w-32 aspect-square rounded-full border-2 border-green-500 p-1 flex justify-center items-center">
        <img
          className="rounded-full"
          src={userProfile?.profilePicture || default_user}
          alt={`${userProfile?.firstName}'s display picture`}
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
      <div className="text-center my-2">
        {userProfile?.about && userProfile?.about.length > 101 ? (
          <p className="text-gray-400 text-sm">{`${userProfile?.about.slice(
            0,
            100
          )}...`}</p>
        ) : (
          <p className="text-gray-400 text-sm">{`${userProfile?.about}`}</p>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="p-3 py-4 rounded-lg bg-green-200/5 text-center shadow-lg shadow-black/5">
          <div className="my-2">
            <span className="text-4xl sm:text-3xl text-white font-display tracking-wider">
              <CountUp
                start={0}
                end={userStatsData?.totalMemories}
                duration={2.5}
              />
            </span>
          </div>
          <h3 className="text-gray-400 sm:text-sm">Total Memories</h3>
        </div>
        <div className="p-3 py-4 rounded-lg bg-green-200/5 text-center shadow-lg shadow-black/5">
          <div className="my-2">
            <span className="text-4xl sm:text-3xl text-white font-display tracking-wider">
              <CountUp
                start={0}
                end={userStatsData?.favoriteMemories}
                duration={2.5}
              />
            </span>
          </div>
          <h3 className="text-gray-400 text-sm">Favorite Memories</h3>
        </div>
        <div className="p-3 py-4 rounded-lg bg-green-200/5 text-center shadow-lg shadow-black/5">
          <div className="my-2">
            <span className="text-4xl sm:text-3xl text-white font-display tracking-wider">
              <CountUp
                start={0}
                end={userStatsData?.totalUniqueTags}
                duration={2.5}
              />
            </span>
          </div>
          <h3 className="text-gray-400 sm:text-sm">Total Tags</h3>
        </div>
        <div className="p-3 py-4 rounded-lg bg-green-200/5 text-center shadow-lg shadow-black/5">
          <div className="my-2">
            <span className="text-4xl sm:text-3xl text-white font-display tracking-wider">
              <CountUp
                start={0}
                end={userStatsData?.totalCategories}
                duration={2.5}
              />
            </span>
          </div>
          <h3 className="text-gray-400 sm:text-sm">Total Categories</h3>
        </div>
      </div>
      <div className="mt-4 flex gap-4 sm:gap-2">
        <Link
          to={userProfile?.socialMedia?.facebook || currentPath}
          className="w-full p-2"
          target="_blank"
        >
          <FaFacebook className="mx-auto text-2xl text-green-500" />
        </Link>
        <Link
          to={userProfile?.socialMedia?.thread || currentPath}
          className="w-full p-2"
          target="_blank"
        >
          <FaThreads className="mx-auto text-2xl text-green-500" />
        </Link>
        <Link
          to={userProfile?.socialMedia?.instagram || currentPath}
          className="w-full p-2"
          target="_blank"
        >
          <FaInstagram className="mx-auto text-2xl text-green-500" />
        </Link>
        <Link
          to={userProfile?.socialMedia?.twitter || currentPath}
          className="w-full p-2"
          target="_blank"
        >
          <FaTwitter className="mx-auto text-2xl text-green-500" />
        </Link>
        <Link
          to={userProfile?.socialMedia?.website || currentPath}
          className="w-full p-2"
          target="_blank"
        >
          <FaFirefoxBrowser className="mx-auto text-2xl text-green-500" />
        </Link>
      </div>

      {showUploader && (
        <ImageUploader
          onClose={() => setShowUploader(false)} // Pass a function to close the uploader
          mutationFunction={updateProfile}
          title="Update your profile picture"
          imageProperties={userProfileImageProperties}
          oldImagePath={userProfile?.profilePicture}
        />
      )}
    </div>
  );
}
