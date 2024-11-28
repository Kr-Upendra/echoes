import { deleteJournal } from "../../api";
import ActionButtons from "../../components/buttons/ActionButtons";
import MoodIcon from "../../components/common/MoodIcon";
import { useDeleteItem } from "../../hooks";
import { IJournalData } from "../../utils";
import useScreenWidth from "../../hooks/useScreenWidth";

type Props = { journals: IJournalData[] };

export function JournalCard({ journals }: Props) {
  const screenWidth = useScreenWidth();
  let imageToRender;

  if (screenWidth > 1050) {
    imageToRender = 5;
  } else if (screenWidth > 750) {
    imageToRender = 3;
  } else if (screenWidth >= 550) {
    imageToRender = 3;
  } else {
    imageToRender = 2;
  }
  const { mutate: deleteJournalMutation } = useDeleteItem(deleteJournal, [
    "journals",
  ]);

  const handleDeleteJournal = (id: string) => {
    deleteJournalMutation(id);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-2 xs:grid-cols-1 gap-4 sm:gap-3">
        {journals.map((journal: IJournalData) => (
          <div
            key={journal._id}
            style={{ borderColor: journal?.color }}
            className={`px-4 sm:px-2.5 xs:px-2 border-t-[10px] pt-3 pb-6 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-green-200/5 group relative`}
          >
            <h1 className="text-green-500 font-display line-clamp-1 sm:text-sm">
              {journal.title}
            </h1>
            <p className="text-sm my-1 sm:text-xs text-gray-500 mb-4 h-20 line-clamp-4 md:h-17 sm:h-15">
              {journal?.content}
            </p>
            <div className="flex items-center">
              <div className={`flex items-center gap-x-3 xs:gap-x-1.5 flex-1`}>
                {journal?.images.length > 0 &&
                  journal?.images
                    .slice(0, imageToRender)
                    .map((image, index: number) => (
                      <div
                        className="w-8 h-8 rounded-lg overflow-hidden"
                        key={journal._id + index}
                      >
                        <img
                          src={image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
              </div>
              <MoodIcon mood={journal.mood} />
            </div>
            <ActionButtons
              id={journal._id}
              hasFavorite={false}
              onDelete={handleDeleteJournal}
            />
          </div>
        ))}
      </div>
    </>
  );
}
