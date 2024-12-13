import { useState } from "react";
import { IJournalData, renderImageLength } from "../../utils";
import ActionButtons from "../buttons/ActionButtons";
import MoodIcon from "../common/MoodIcon";
import ViewImageModel from "../common/ViewImageModel";

type Props = {
  journal: IJournalData;
  onRequestDelete: () => void;
};

export default function JournalCard({ journal, onRequestDelete }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const imageToRender = renderImageLength();

  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeImageModal = () => {
    setIsModalOpen(false);
  };
  return (
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
                  className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
                  key={journal._id + index}
                  onClick={() => openImageModal(index)} // Open the modal on image click
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
      <div className="mt-4 flex items-center gap-x-1">
        {journal.tags.slice(0, 2).map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-white/10 text-gray-100 font-monaco rounded-sm capitalize"
          >
            {tag}
          </span>
        ))}
      </div>
      <ActionButtons
        id={journal._id}
        hasFavorite={false}
        onDelete={onRequestDelete}
      />
      {isModalOpen && (
        <ViewImageModel
          images={journal.images} // Pass the images to the modal
          initialIndex={modalImageIndex} // Pass the initial index of the clicked image
          onClose={closeImageModal} // Pass the close function to the modal
        />
      )}
    </div>
  );
}
