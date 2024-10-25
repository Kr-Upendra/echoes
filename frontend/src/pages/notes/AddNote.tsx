import { useQuery } from "@tanstack/react-query";
import { categories } from "../../api";
import PageTitle from "../../components/PageTitle";
import NoteForm from "../../containers/notes/NoteForm";

export default function AddNote() {
  const { data: categoryData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: categories,
  });
  const categoriesList = categoryData?.data?.categories;
  return (
    <>
      <PageTitle title="Add new note" buttonTitle="" hrefValue="" />
      <NoteForm
        categoriesList={categoriesList}
        isLoadingCategories={isLoadingCategories}
      />
    </>
  );
}
