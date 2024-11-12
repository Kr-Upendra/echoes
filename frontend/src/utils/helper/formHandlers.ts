export const setSelectedMood = <T>(
  mood: string,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  setFormData((prevData) => ({
    ...prevData,
    mood,
  }));
};

export const handleTagsChange = <T>(
  tags: string[],
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  setFormData((prevData) => ({
    ...prevData,
    tags,
  }));
};

export const handleChange = <T>(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
