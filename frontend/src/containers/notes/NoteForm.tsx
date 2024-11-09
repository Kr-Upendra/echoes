import { z } from "zod";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomCheckbox from "../../components/form/CustomCheckBox";
import CustomInput from "../../components/form/CustomInput";
import CustomSelect from "../../components/form/CustomSelect";
import CustomTextArea from "../../components/form/CustomTextArea";
import { INote, NoteFormData, noteSchema } from "../../utils";
import { createNote, updateNote } from "../../api";
import { useCreateItem, useUpdateItem } from "../../hooks";
import CustomTagInput from "../../components/form/CustomTagInput";

type Props = {
  noteData?: INote;
  categoriesList: any;
  isLoadingCategories: boolean;
};

export default function NoteForm({
  noteData,
  categoriesList,
  isLoadingCategories,
}: Props) {
  const { mutate: addNoteMutation, isPending: isAddPending } =
    useCreateItem<NoteFormData>(createNote, ["allNotes", "note"], "/memories");
  const { mutate: updateNoteMutation, isPending: isUpdatePending } =
    useUpdateItem<NoteFormData>(
      updateNote,
      ["allNotes", "note"],
      true,
      "/memories"
    );
  const { pathname } = useLocation();

  const { id } = useParams();
  const isCreateForm = pathname === "/memories/create";

  const [errors, setErrors] = useState<any | null>(null);
  const [formData, setFormData] = useState<NoteFormData>({
    title: noteData?.title || "",
    category: noteData?.category?._id || "",
    content: noteData?.content || "",
    tags: noteData?.tags || [],
    isFavorite: noteData?.isFavorite || false,
  });

  useEffect(() => {
    if (noteData) {
      setFormData({
        title: noteData.title || "",
        category: noteData.category?._id || "",
        content: noteData.content || "",
        tags: noteData.tags || [],
        isFavorite: noteData.isFavorite || false,
      });
    }
  }, [noteData]);

  const handleTagsChange = (updatedTags: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: updatedTags, // Update the tags in formData
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("formData: ", formData);
      noteSchema.parse(formData);
      if (isCreateForm) addNoteMutation(formData);
      else if (id) {
        updateNoteMutation({ id, formdata: formData });
      }
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: any = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <div className="mt-8 card-diff py-8 px-4 rounded-md pb-12">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomInput
            id="noteTitle"
            label="Title"
            name="title"
            type="text"
            placeHolder="I have attend meeting."
            value={formData?.title}
            onchange={handleChange}
            error={errors?.title}
          />
          <CustomSelect
            id="noteCategory"
            label="Category"
            name="category"
            value={formData?.category}
            onChange={handleChange}
            options={
              isLoadingCategories
                ? []
                : categoriesList.map((category: any) => ({
                    value: category._id,
                    label: category.title,
                  }))
            }
            error={errors?.category}
          />
        </div>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomTextArea
            id="noteContent"
            label="Content"
            name="content"
            placeHolder="There is a meeting in my office that I need to attend at any cost."
            value={formData?.content}
            onChange={handleChange}
            error={errors?.content}
          />
        </div>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomTagInput
            onTagsChange={handleTagsChange}
            initialTags={formData.tags} // This will pre-populate tags for editing
          />
          <CustomCheckbox
            id="noteFavorite"
            label="Is Favorite?"
            name="isFavorite"
            checked={formData?.isFavorite}
            onChange={handleChange}
            error={errors?.isFavorite}
          />
        </div>
        <div className="mt-6">
          {isCreateForm ? (
            <button
              disabled={isAddPending}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
            >
              {isAddPending ? "Adding" : "Add Memory"}
            </button>
          ) : (
            <button
              disabled={isUpdatePending}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
            >
              {isUpdatePending ? "Updating" : "Update Memory"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
