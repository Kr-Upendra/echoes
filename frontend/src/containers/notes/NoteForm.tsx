import { z } from "zod";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomCheckbox from "../../components/form/CustomCheckBox";
import CustomInput from "../../components/form/CustomInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import {
  handleChange,
  handleTagsChange,
  INote,
  NoteFormData,
  noteSchema,
} from "../../utils";
import { createNote, updateNote } from "../../api";
import { useCreateItem, useUpdateItem } from "../../hooks";
import CustomTagInput from "../../components/form/CustomTagInput";

type Props = {
  noteData?: INote;
};

export default function NoteForm({ noteData }: Props) {
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
    content: noteData?.content || "",
    tags: noteData?.tags || [],
    isFavorite: noteData?.isFavorite || false,
  });

  useEffect(() => {
    if (noteData) {
      setFormData({
        title: noteData.title || "",
        content: noteData.content || "",
        tags: noteData.tags || [],
        isFavorite: noteData.isFavorite || false,
      });
    }
  }, [noteData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, setFormData)
            }
            error={errors?.title}
          />
        </div>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomTextArea
            id="noteContent"
            label="Content"
            name="content"
            placeHolder="There is a meeting in my office that I need to attend at any cost."
            value={formData?.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e, setFormData)
            }
            error={errors?.content}
          />
        </div>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomTagInput
            onTagsChange={(tags: string[]) =>
              handleTagsChange(tags, setFormData)
            }
            initialTags={formData.tags}
          />
          <CustomCheckbox
            id="noteFavorite"
            label="Is Favorite?"
            name="isFavorite"
            checked={formData?.isFavorite}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, setFormData)
            }
            error={errors?.isFavorite}
          />
        </div>
        <div className="mt-6">
          {isCreateForm ? (
            <button
              disabled={isAddPending}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
              type="submit"
            >
              {isAddPending ? "Adding" : "Add Memory"}
            </button>
          ) : (
            <button
              disabled={isUpdatePending}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
              type="submit"
            >
              {isUpdatePending ? "Updating" : "Update Memory"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
