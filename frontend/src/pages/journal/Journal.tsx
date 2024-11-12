import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import { Calender, JournalContainer } from "../../containers";
import { allJournals } from "../../api";
import { useLoaderData } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export default function Journal() {
  const { journals }: any = useLoaderData();
  const { data, isLoading, error } = useQuery({
    queryKey: ["journals"],
    queryFn: allJournals,
  });

  console.log(data, isLoading, error);

  return (
    <>
      <PageTitle
        title="My Journals"
        buttonTitle="New Journal"
        hrefValue="create"
      />
      <div className="mt-6 flex sm:flex-col gap-6">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
            <JournalContainer journals={journals} />
            <Calender />
          </>
        )}
      </div>
    </>
  );
}
