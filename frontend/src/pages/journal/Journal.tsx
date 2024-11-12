import { useLoaderData } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { Calender, JournalContainer } from "../../containers";

export default function Journal() {
  const { journals, pagination }: any = useLoaderData();
  console.log(pagination);
  return (
    <>
      <PageTitle
        title="My Journals"
        buttonTitle="New Journal"
        hrefValue="create"
      />
      <div className="mt-6 flex sm:flex-col gap-6">
        <JournalContainer journals={journals} />
        <Calender />
      </div>
    </>
  );
}
