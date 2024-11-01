import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { voiceNote } from "../../api";
import PageTitle from "../../components/PageTitle";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import VoiceNoteForm from "../../containers/VoiceNotes/VoiceNoteForm";

export default function EditVoiceNote() {
  const params = useParams();
  const voiceNoteId = params.id || "";
  const { data, isLoading, error } = useQuery({
    queryKey: ["voiceNote", voiceNoteId],
    queryFn: () => voiceNote(voiceNoteId),
    enabled: !!voiceNoteId,
  });

  const voiceNoteData = data?.data?.voiceNote;

  return (
    <>
      <PageTitle title="Edit Voice note" buttonTitle="" hrefValue="" />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <VoiceNoteForm voiceNoteData={voiceNoteData} />
      )}
    </>
  );
}
