import { useState } from "react";
import CustomCheckbox from "../../components/form/CustomCheckBox";
import CustomInput from "../../components/form/CustomInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import AudioRecorder from "../../components/form/AudioRecorderInput";
// import { INote } from "../../utils";

// type Props = {
//   noteData?: INote;
//   categoriesList: any;
//   isLoadingCategories: boolean;
// };

export default function VoiceNoteForm() {
  //   const { mutate: addNoteMutation, isPending: isAddPending } =
  //     useCreateItem<NoteFormData>(createNote, ["allNotes"]);
  //   const { mutate: updateNoteMutation, isPending: isUpdatePending } =
  //     useUpdateItem<NoteFormData>(updateNote, ["allNotes"], true);
  //   const { pathname } = useLocation();

  //   const { id } = useParams();
  //   const isCreateForm = pathname === "/notes/create";

  // const [formData, setFormData] = useState<NoteFormData>({
  //   title: noteData?.title || "",
  //   category: noteData?.category?._id || "",
  //   content: noteData?.content || "",
  //   tags: noteData?.tags || [],
  //   isFavorite: noteData?.isFavorite || false,
  // });

  const [formData, setFormData] = useState<any | null>(null);
  const [errors, setErrors] = useState<any | null>(null);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    // const { name, value, type } = e.target;
    // if (name === "tags") {
    //   const tagsArray = value
    //     .split(",")
    //     .map((tag) => tag.trim())
    //     .filter((tag) => tag !== "");
    //   setFormData((prev) => ({ ...prev, [name]: tagsArray }));
    // } else if (type === "checkbox") {
    //   const checked = (e.target as HTMLInputElement).checked;
    //   setFormData((prev) => ({ ...prev, [name]: checked }));
    // } else {
    //   setFormData((prev) => ({ ...prev, [name]: value }));
    // }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // try {
    //   noteSchema.parse(formData);
    //   if (isCreateForm) addNoteMutation(formData);
    //   else if (id) {
    //     updateNoteMutation({ id, formdata: formData });
    //   }
    //   setErrors({});
    // } catch (err) {
    //   if (err instanceof z.ZodError) {
    //     const formattedErrors: any = {};
    //     err.errors.forEach((error) => {
    //       formattedErrors[error.path[0]] = error.message;
    //     });
    //     setErrors(formattedErrors);
    //   }
    // }
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
        </div>
        <div className="flex gap-x-5 lg:flex-col">
          <AudioRecorder />
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
          <CustomInput
            id="noteTags"
            label="Tags"
            name="tags"
            type="text"
            placeHolder="Comma separated values"
            value={formData?.tags && formData?.tags.join(", ")}
            onchange={handleChange}
            error={errors?.tags}
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
          <button
            disabled={false}
            className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
          >
            Add Note
          </button>
        </div>
        {/* <div className="mt-6">
          {isCreateForm ? (
            <button
              disabled={isAddPending}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
            >
              {isAddPending ? "Adding" : "Add Note"}
            </button>
          ) : (
            <button
              disabled={isUpdatePending}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
            >
              {isUpdatePending ? "Updating" : "Update Note"}
            </button>
          )}
        </div> */}
      </form>
    </div>
  );
}

/*

userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true, trim: true },
    audioUrl: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description: { type: String, trim: true },
    tags: { type: [String], default: [] },
    transcription: { type: String, trim: true },
    isFavorite: { type: Boolean, default: false },
    visibility: { type: String, enum: ['public', 'private', 'shared'], default: 'private' },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: { type: String },
    originalFileName: { type: String, trim: true },
    playCount: { type: Number, default: 0 },
});

*/
