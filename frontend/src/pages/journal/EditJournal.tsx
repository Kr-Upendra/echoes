import PageTitle from "../../components/PageTitle";
import JournalForm from "../../containers/journal/JournalForm";
import { IJournalData } from "../../utils";

export default function EditJournal() {
  const testJournalData: IJournalData = {
    id: "testId",
    title: "First journal entry",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    tags: ["First", "Test", "Journal"],
    mood: "happy",
    images: [],
  };

  return (
    <>
      <PageTitle title="Edit new journal" buttonTitle="" hrefValue="" />
      <JournalForm journalData={testJournalData} />
    </>
  );
}
