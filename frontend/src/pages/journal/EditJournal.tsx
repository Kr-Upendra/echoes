import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { singleJournal } from "../../api";
import PageTitle from "../../components/PageTitle";
import JournalForm from "../../containers/journal/JournalForm";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export default function EditJournal() {
  const params = useParams();
  const journalId = params.id || "";
  const { data, isLoading, error } = useQuery({
    queryKey: ["journal", journalId],
    queryFn: () => singleJournal(journalId),
  });

  const journal = data?.data?.journal;

  return (
    <>
      <PageTitle title="Edit new journal" buttonTitle="" hrefValue="" />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <JournalForm journalData={journal} />
      )}
    </>
  );
}
