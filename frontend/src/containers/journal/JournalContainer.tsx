import users from "../../assets/users";
import ActionButtons from "../../components/buttons/ActionButtons";
import MoodIcon from "../../components/common/MoodIcon";
import { IJournalData } from "../../utils";

type Props = { journals: IJournalData[] };

export default function JournalContainer({ journals }: Props) {
  return (
    <div className="h-full w-2/3 sm:w-full md:w-1/2 rounded-md grid grid-cols-2 md:grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
      {journals.map((journal: IJournalData) => (
        <div
          key={journal._id}
          style={{ borderColor: journal?.color }}
          className={`px-4 border-t-[10px] pt-3 pb-6 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5 group relative`}
        >
          <h1 className="text-green-500 font-display line-clamp-1 sm:text-sm">
            {journal.title}
          </h1>
          <p className="text-sm my-1 sm:text-xs text-gray-500 mb-4 h-20 line-clamp-4 md:h-17 sm:h-15">
            {journal?.content}
          </p>
          <div className="flex">
            <div className="flex items-center gap-x-3 flex-1">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  src={users.user01}
                  alt={"hello user"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  src={users.user01}
                  alt={"hello user"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <MoodIcon mood={journal.mood} />
          </div>
          <ActionButtons id={journal._id} hasFavorite={false} />
        </div>
      ))}
    </div>
  );
}
