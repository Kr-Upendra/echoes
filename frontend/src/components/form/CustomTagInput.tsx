import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

type CustomTagInputProps = {
  onTagsChange: (tags: string[]) => void;
  initialTags?: string[];
};

export default function CustomTagInput({
  onTagsChange,
  initialTags = [],
}: CustomTagInputProps) {
  const [input, setInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>(initialTags);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      const tag = input.trim().replace(/,$/, ""); // Remove trailing commas
      if (tag && !tags.includes(tag)) {
        const newTags = [...tags, tag];
        setTags((prevTags) => [...prevTags, tag]);
        onTagsChange(newTags);
        setInput(""); // Clear the input field
      }
    }
  };

  const handleBlur = () => {
    const tag = input.trim();
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags((prevTags) => [...prevTags, tag]);
      onTagsChange(newTags);
      setInput(""); // Clear the input field
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onTagsChange(newTags); // Send updated tags to parent
  };

  return (
    <div className="mt-2 mb-3.5 w-full">
      <label
        className="block mb-1 text-sm font-medium text-gray-200 capitalize"
        htmlFor="input-tags"
      >
        Tags
      </label>
      <input
        id="input-tags"
        type="text"
        placeholder="Enter comma seperated values"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        className={`w-full text-green-500 font-display px-2 py-3 outline-none placeholder:font-body bg-black border rounded-md border-green-500/15 focus:border-green-500/30`}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
      />
      <div className="mt-2 flex gap-x-2 flex-wrap gap-y-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="px-2 py-1 font-monaco lowercase text-sm flex justify-center items-center gap-x-1.5 rounded-sm bg-green-200/10 shadow-lg"
          >
            {tag}
            <button
              type="button"
              className="border rounded-sm border-green-500/30 font-display"
              onClick={() => handleRemoveTag(index)}
            >
              <FaXmark className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
