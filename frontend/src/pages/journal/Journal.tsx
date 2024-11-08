import PageTitle from "../../components/PageTitle";
import { Calender, JournalContainer } from "../../containers";

export default function Journal() {
  return (
    <>
      <PageTitle
        title="My Journals"
        buttonTitle="New Journal"
        hrefValue="create"
      />
      <div className="mt-6 flex sm:flex-col gap-6">
        <JournalContainer />
        <Calender />
      </div>
    </>
  );
}
