import { useState } from "react";
import CustomCheckbox from "../../components/form/CustomCheckBox";
import CustomInput from "../../components/form/CustomInput";
import CustomSelect from "../../components/form/CustomSelect";
import CustomTextArea from "../../components/form/CustomTextArea";
import { z } from "zod";
import { NoteFormData } from "../../utils";

// Define allowed categories
const allowedCategories = ["all", "work", "personal", "special"] as const; // Replace with your categories

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 words" })
    .max(50, { message: "Title must not exceed 50 words" })
    .refine(
      (val) =>
        val.trim().split(/\s+/).length >= 3 &&
        val.trim().split(/\s+/).length <= 50,
      {
        message: "Title must be between 3 and 50 words",
      }
    ),
  category: z.enum(allowedCategories, {
    message: "Category must be one of the predefined options",
  }),
  content: z.string().refine((val) => val.trim().split(/\s+/).length >= 15, {
    message: "Content must have at least 15 words",
  }),
  tags: z
    .array(z.string())
    .nonempty({ message: "Tags must be an array of strings" }),
});

export default function NoteForm() {
  const [errors, setErrors] = useState<any | null>(null);
  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    category: "all",
    content: "",
    tags: [],
    isFavorite: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (name === "tags") {
      // Split the value by commas, trim whitespace, and filter out empty strings
      const tagsArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""); // Only include non-empty tags

      // Update formData with the new tags array
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
    try {
      console.log(formData);
      console.log("erros", errors);
      schema.parse(formData);
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
            isDisabled={false}
            onchange={handleChange}
            error={errors?.title}
          />
          <CustomSelect
            id="noteCategory"
            label="Category"
            name="category"
            value={formData?.category}
            isDisabled={false}
            onChange={handleChange}
            options={[
              { value: "all", label: "All" },
              { value: "work", label: "Work" },
              { value: "personal", label: "Personal" },
              { value: "special", label: "Special" },
            ]}
            error={errors?.category}
          />
        </div>
        <div className="flex gap-x-5 lg:flex-col">
          <CustomTextArea
            id="noteContent"
            label="Content"
            name="content"
            placeHolder="There is a meeting in my that I need to attend at any cost."
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
            value={formData.tags.join(", ")}
            isDisabled={false}
            onchange={handleChange}
            error={errors?.tags}
          />
          <CustomCheckbox
            id="noteFavorite"
            label="Is Favorite?"
            name="isFavorite"
            checked={formData?.isFavorite}
            isDisabled={false}
            onChange={handleChange}
            error={errors?.isFavorite}
          />
        </div>
        <div className="mt-6">
          <button className="w-full text-center py-2 rounded-full bg-gradient-to-tr from-green-700 via-green-800 to-green-700 text-white font-display">
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}
