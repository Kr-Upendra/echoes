import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  errorAlert,
  handleChange,
  handleFilesChange,
  handleTagsChange,
  IJournalData,
  JournalFormData,
  journalNoteSchema,
  setSelectedMood,
  // JournalUpdateFormData,
  successAlert,
} from "../../utils";
import CustomInput from "../../components/form/CustomInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import CustomTagInput from "../../components/form/CustomTagInput";
import MoodInput from "../../components/form/MoodInput";
import FileUploadInput from "../../components/form/FileUploadInput";
import SubmitButton from "../../components/form/SubmitButton";
import { createJournal } from "../../api";

type Props = { journalData?: IJournalData };

export default function JournalForm({ journalData }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isCreateForm = pathname === "/journals/create";
  // const [setFilesToDelete] = useState<string[]>([]);
  const [isUpdaing] = useState<boolean>(false);
  const [errors, setErrors] = useState<any | null>({});
  // const { mutate: updateJournalMutation } =
  //   useUpdateItem<JournalUpdateFormData>(
  //     updateJournal,
  //     ["journals", "journal"],
  //     true,
  //     "/journals"
  //   );

  const [formData, setFormData] = useState<JournalFormData>({
    title: journalData?.title || "",
    content: journalData?.content || "",
    tags: journalData?.tags || [],
    mood: journalData?.mood || "neutral",
    images: journalData?.images || [],
  });

  useEffect(() => {
    if (journalData) {
      setFormData({
        title: journalData.title || "",
        content: journalData?.content || "",
        tags: journalData?.tags || [],
        mood: journalData?.mood || "neutral",
        images: journalData?.images || [],
      });
    }
  }, [journalData]);

  const { mutate: addJournalMutation, isPending: isJouranlAdding } =
    useMutation({
      mutationFn: createJournal,
      onSuccess: async (response: ApiResponse) => {
        if (response.status === "success") {
          successAlert(response?.message || "New journal added successfully.");
          setTimeout(() => {
            navigate("/journals");
          }, 1000);
        }
      },
      onError: (error: any) => {
        errorAlert(error?.message);
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrors({});
      journalNoteSchema.parse(formData);
      if (isCreateForm) {
        addJournalMutation(formData);
      }
      // Handle journal update here
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log("errer", err);
        const formattedErrors: any = {};
        err.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  const handleRemoveFile = (fileToRemove: string) => {
    console.log(fileToRemove);
    // const filteredFiles = formData?.images.filter(
    //   (file: string | File) =>
    //     typeof file === "string"
    //       ? file !== fileToRemove
    //       : file.preview !== fileToRemove
    // );
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   images: filteredFiles,
    // }));
    // if (fileToRemove.startsWith("https")) {
    //   // setFilesToDelete((prevRemovedFiles) => {
    //     if (!prevRemovedFiles.includes(fileToRemove)) {
    //       return [...prevRemovedFiles, fileToRemove];
    //     }
    //     return prevRemovedFiles;
    //   // });
    // }
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
            maxFiles={5}
            files={formData?.images}
            onFilesChange={(images) => handleFilesChange(images, setFormData)}
            onRemoveFile={handleRemoveFile}
          />
        </div>
        <div className="mt-6">
          {isCreateForm ? (
            <SubmitButton
              title="Add"
              isDisabled={false}
              isWorking={isJouranlAdding}
              workingTitle="Adding..."
            />
          ) : (
            <SubmitButton
              title="Update"
              isDisabled={false}
              isWorking={isUpdaing}
              workingTitle="Updating..."
            />
          )}
        </div>
      </form>
    </section>
  );
}
