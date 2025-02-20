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
  e: React.ChangeEvent<
    HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
  >,
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value, type } = e.target;
  if (type === "checkbox") {
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

export const handleFilesChange = <T>(
  files: (File | string)[],
  setFormData: React.Dispatch<React.SetStateAction<T>>
) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    images: files,
  }));
};
