import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { note } from "../../api";
import PageTitle from "../../components/PageTitle";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import VoiceNoteForm from "../../containers/VoiceNotes/VoiceNoteForm";

export default function EditVoiceNote() {
  const params = useParams();
  const noteId = params.id || "";
  const { isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => note(noteId),
    enabled: !!noteId,
  });

  return (
    <>
      <PageTitle title="Edit Voice note" buttonTitle="" hrefValue="" />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <VoiceNoteForm />
      )}
    </>
  );
}
