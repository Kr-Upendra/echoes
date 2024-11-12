import { useDropzone } from "react-dropzone";
import { FaXmark } from "react-icons/fa6";
import { warnAlert } from "../../utils";
interface FileWithPreview extends File {
  preview: string;
}

interface FileUploadInputProps {
  onFilesChange: (files: FileWithPreview[]) => void;
  files: FileWithPreview[];
  maxFiles: number;
}

export default function FileUploadInput({
  onFilesChange,
  files,
  maxFiles,
}: FileUploadInputProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.filter(
      (file) =>
        !files.some(
          (existingFile) =>
            existingFile.name === file.name &&
            existingFile.lastModified === file.lastModified
        )
    );

    if (newFiles.length === 0) {
      warnAlert("This file has already been selected.");
      return;
    }

    if (files.length + newFiles.length > maxFiles) {
      warnAlert(`You can only select up to ${maxFiles} files.`);
      return;
    }

    const newFilesWithPreview = newFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    onFilesChange([...files, ...newFilesWithPreview]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFiles,
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
    onDrop,
    multiple: true,
  });

  const handleRemove = (fileToRemove: FileWithPreview) => {
    const filteredFiles = files.filter((file) => file !== fileToRemove);
    onFilesChange(filteredFiles);
  };

  return (
    <div className="mt-2 mb-3.5 w-full">
      <label
        className="block mb-1 text-sm font-medium text-gray-200 capitalize"
        htmlFor="mood-input"
      >
        Include images
      </label>
      <div
        {...getRootProps()}
        className="text-center focus:border-green-500/30 font-display py-14 md:py-12 sm:py-10 px-4 rounded-md bg-black border border-green-500/15 shadow-lg shadow-black/10"
      >
        <input {...getInputProps()} />
        <p className="sm:text-sm">
          Drag 'n' drop files, or click to select files
        </p>
      </div>
      <div className="flex flex-wrap justify-start px-2 mt-4 gap-4">
        {files.map((file) => (
          <div
            key={file.name}
            className="w-12 h-12 sm:w-8 sm:h-8 rounded-lg relative p-[1px] bg-green-200/20 backdrop-blur-sm"
          >
            <img
              src={file.preview}
              alt={file.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              className="bg-green-500/30 z-10 p-1 rounded-full backdrop-blur-sm absolute -top-2 -right-2 sm:-top-1.5 sm:-right-1.5 sm:p-0.5 shadow-lg"
              onClick={() => handleRemove(file)}
            >
              <FaXmark className="text-white text-sm sm:text-xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
