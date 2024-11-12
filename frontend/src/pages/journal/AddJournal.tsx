import { useState } from "react";
import CustomInput from "../../components/form/CustomInput";
import CustomTagInput from "../../components/form/CustomTagInput";
import CustomTextArea from "../../components/form/CustomTextArea";
import MoodInput from "../../components/form/MoodInput";
import PageTitle from "../../components/PageTitle";
import { JournalFormData } from "../../utils";

export default function AddJournal() {
  const [formData, setFormData] = useState<JournalFormData>({
    title: "",
    content: "",
    tags: [],
    mood: "neutral",
  });

  const setSelectedMood = (mood: string) => {
    setFormData((prevData) => ({
      ...prevData,
      mood,
    }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      tags,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <PageTitle title="Add new journal" buttonTitle="" hrefValue="" />
      <section className="mt-8 card-diff py-8 px-4 rounded-md pb-12">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomInput
              id="journal-title"
              label="Title"
              name="title"
              placeHolder="I have attend meeting."
              value={formData?.title}
              onchange={handleChange}
              error={""}
            />
          </div>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomTextArea
              id="journal-content"
              label="Content"
              name="content"
              placeHolder="There is a meeting in my office that I need to attend at any cost."
              value={formData?.content}
              onChange={handleChange}
              error={""}
            />
          </div>
          <div className="flex gap-x-5 lg:flex-col">
            <CustomTagInput
              onTagsChange={handleTagsChange}
              initialTags={formData?.tags}
            />
            <MoodInput
              selectedMood={formData.mood}
              setSelectedMood={setSelectedMood}
            />
          </div>
          <div className="mt-6">
            <button
              disabled={false}
              className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
