import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import NoteForm from "../../containers/notes/NoteForm";
import { categories, note } from "../../api";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export default function EditNote() {
  const params = useParams();
  const noteId = params.id || "";
  const { data, isLoading, error } = useQuery({
    queryKey: ["note", noteId], // Use a unique key based on the note ID
    queryFn: () => note(noteId),
    enabled: !!noteId, // Ensure the query only runs if id is defined
  });
  const { data: categoryData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: categories,
  });
  const categoriesList = categoryData?.data?.categories;
  const noteData = data?.data?.note;

  return (
    <>
      <PageTitle title="Edit memory" buttonTitle="" hrefValue="" />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <NoteForm
          noteData={noteData}
          categoriesList={categoriesList}
          isLoadingCategories={isLoadingCategories}
        />
      )}
    </>
  );
}
