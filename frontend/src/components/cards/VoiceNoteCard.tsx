import { BsPlayCircleFill } from "react-icons/bs";
import ActionButtons from "../buttons/ActionButtons";
import { FaMicrophone } from "react-icons/fa6";

type Props = {
  title: string;
  voiceNoteUrl: string;
  isFavorite: boolean;
  voiceNoteId: string;
};

export default function VoiceNoteCard({
  title,
  voiceNoteUrl,
  voiceNoteId,
  isFavorite,
}: Props) {
  return (
    <div className="group rounded-lg group relative">
      <div className="bg-green-900 py-2 rounded-t-lg"></div>
      <div className="p-3 shadow-lg card-diff-2 rounded-b-lg">
        <div className="mb-4">
          <FaMicrophone className="text-8xl sm:text-5xl mx-auto text-green-500" />
        </div>
        <div className="mb-2">
          <h2 className="text-white font-display line-clamp-1 sm:text-sm">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="h-0.5 w-full bg-green-500 rounded-full relative">
            <div className="absolute -top-[3px] left-0 p-1 bg-white rounded-full"></div>
          </div>
          <button>
            <BsPlayCircleFill className="text-green-500 mx-auto text-3xl" />
            {/* <BsPauseCircleFill className="text-green-500 mx-auto text-3xl" /> */}
          </button>
        </div>
      </div>
      <ActionButtons id={voiceNoteId} isFavorite={isFavorite} />
    </div>
  );
}
