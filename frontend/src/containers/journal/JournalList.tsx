import { useState } from "react";
import { deleteJournal } from "../../api";
import JournalCard from "../../components/journal/JournalCard";
import { useDeleteItem } from "../../hooks";
import { IJournalData } from "../../utils";
import ModelContainer from "../models/ModelContainer";
import DeleteModel from "../../components/DeleteModel";

type Props = { journals: IJournalData[] };

export function JournalList({ journals }: Props) {
  const { mutate: deleteJournalMutation } = useDeleteItem(deleteJournal, [
    "journals",
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState<string | null>(
    null
  );

  const handleRequestDelete = (id: string) => {
    setSelectedJournalId(id);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedJournalId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedJournalId) {
      setIsModalOpen(false);
      deleteJournalMutation(selectedJournalId);
      setSelectedJournalId(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-2 xs:grid-cols-1 gap-4 sm:gap-3">
        {journals &&
          journals.map((journal: IJournalData) => (
            <JournalCard
              key={journal._id}
              journal={journal}
              onRequestDelete={() => handleRequestDelete(journal._id)}
            />
          ))}
      </div>
      <ModelContainer isOpen={isModalOpen} onCancel={handleCancelDelete}>
        <DeleteModel
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this journal? This action cannot be undone."
        />
      </ModelContainer>
    </>
  );
}
