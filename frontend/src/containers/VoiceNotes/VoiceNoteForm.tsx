import { useState } from "react";
import CustomCheckbox from "../../components/form/CustomCheckBox";
import CustomInput from "../../components/form/CustomInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import AudioRecorder from "../../components/form/AudioRecorderInput";
import {
  convertToVoiceFile,
  generateFileName,
  getUserData,
  supabaseNotesBucket,
  VoiceNoteFormData,
  voiceNoteSchema,
} from "../../utils";
import { z } from "zod";
import { uploadAudio } from "../../api";
import { createVoiceNote, updateVoiceNote } from "../../api/voiceNote";
import { useCreateItem, useUpdateItem } from "../../hooks";
import { useLocation, useParams } from "react-router-dom";

export default function VoiceNoteForm() {
  const { mutate: addVoiceNoteMutation, isPending: isAddPending } =
    useCreateItem<VoiceNoteFormData>(createVoiceNote, [""]);
  const { mutate: updateVoiceNoteMutation, isPending: isUpdatePending } =
    useUpdateItem<VoiceNoteFormData>(updateVoiceNote, ["allNotes"], true);
  const { userId } = getUserData();
  const { id } = useParams();
  const { pathname } = useLocation();
  const isCreateForm = pathname === "/voice-notes/create";

  const [audioUrl, setAudioUrl] = useState("");
  const [formData, setFormData] = useState<VoiceNoteFormData>({
    title: "",
    description: "",
    tags: [""],
    isFavorite: false,
  });
  const [errors, setErrors] = useState<any | null>(null);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (name === "tags") {
      const tagsArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      setFormData((prev) => ({ ...prev, [name]: tagsArray }));
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!audioUrl) {
      setErrors({ voiceNote: "Audio file is required." });
      return;
    }

    try {
      const formDataWithAudio = { ...formData, voiceNote: audioUrl };
      voiceNoteSchema.parse(formDataWithAudio);
      const audioNoteFile = await convertToVoiceFile(
        formDataWithAudio?.voiceNote
      );

      const filename = generateFileName(
        audioNoteFile,
        userId,
        "note",
        formDataWithAudio?.title
      );

      const publicUrl = await uploadAudio(
        audioNoteFile,
        supabaseNotesBucket,
        filename
      );

      if (isCreateForm)
        addVoiceNoteMutation({ ...formDataWithAudio, voiceNote: publicUrl });
      else if (id) {
        updateVoiceNoteMutation({
          id,
          formdata: {
            ...formData,
            voiceNote: publicUrl,
          },
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formattedErrors: any = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      }
      console.log(errors);
    }
  };

  return (
    <div className="mt-8 card-diff py-8 px-4 rounded-md pb-12">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomInput
            id="voiceNoteTitle"
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
          <AudioRecorder
            error={errors?.voiceNote}
            audioUrl={audioUrl}
            setAudioUrl={setAudioUrl}
          />
          <CustomTextArea
            id="voiceNoteDescription"
            label="Description"
            name="description"
            placeHolder="There is a meeting in my office that I need to attend at any cost."
            value={formData?.description}
            onChange={handleChange}
            error={errors?.content}
          />
        </div>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomInput
            id="voiceNoteTags"
            label="Tags"
            name="tags"
            type="text"
            placeHolder="Comma separated values"
            value={formData?.tags && formData?.tags.join(", ")}
            onchange={handleChange}
            error={errors?.tags}
          />
          <CustomCheckbox
            id="voiceNoteFavorite"
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
        </div>
      </form>
    </div>
  );
}
