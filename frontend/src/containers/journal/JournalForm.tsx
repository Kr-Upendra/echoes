import { useState } from "react";
import {
  handleChange,
  handleFilesChange,
  handleTagsChange,
  IJournalData,
  JournalFormData,
  journalNoteSchema,
  setSelectedMood,
} from "../../utils";
import CustomInput from "../../components/form/CustomInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import CustomTagInput from "../../components/form/CustomTagInput";
import MoodInput from "../../components/form/MoodInput";
import FileUploadInput from "../../components/form/FileUploadInput";
import SubmitButton from "../../components/form/SubmitButton";
import { z } from "zod";

type Props = { journalData?: IJournalData };

export default function JournalForm({ journalData }: Props) {
  const [errors, setErrors] = useState<any | null>({});
  const [formData, setFormData] = useState<JournalFormData>({
    title: journalData?.title || "",
    content: journalData?.content || "",
    tags: journalData?.tags || [],
    mood: journalData?.mood || "neutral",
    images: journalData?.images || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrors({});
      journalNoteSchema.parse(formData);
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
    <section className="mt-8 card-diff py-8 px-4 rounded-md pb-12">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomInput
            id="journal-title"
            label="Title"
            name="title"
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
            id="journal-content"
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
            initialTags={formData?.tags}
          />
          <MoodInput
            selectedMood={formData.mood}
            setSelectedMood={(mood) => setSelectedMood(mood, setFormData)}
          />
        </div>
        <div className="flex gap-x-5 lg:flex-col">
          <FileUploadInput
            maxFiles={10}
            files={formData.images}
            onFilesChange={(images) => handleFilesChange(images, setFormData)}
          />
        </div>
        <div className="mt-6">
          <SubmitButton
            title="Add"
            isDisabled={false}
            isWorking={false}
            workingTitle="Adding..."
          />
        </div>
      </form>
    </section>
  );
}
