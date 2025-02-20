import { useDropzone } from "react-dropzone";
import { warnAlert } from "../../utils";

interface FileUploadInputProps {
  onFilesChange: (files: (File | string)[]) => void;
  onRemoveFile: (fileToRemove: string) => void;
  files: (File | string)[];
  maxFiles: number;
}

export default function FileUploadInput({
  onFilesChange,
  files,
  maxFiles,
}: FileUploadInputProps) {
  console.log({ files });
  const maxLimit = files.length >= maxFiles;
  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.filter(
      (file) =>
        !files.some(
          (existingFile) =>
            typeof existingFile !== "string" && // Check that the existing item is not a string
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

    onFilesChange([...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFiles,
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
    onDrop,
    multiple: true,
    disabled: maxLimit,
  });

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
        className={`text-center focus:border-green-500/30 font-display  md:py-12 sm:py-10 px-4 rounded-md bg-black border border-green-500/15 shadow-lg shadow-black/10 ${
          maxLimit ? "bg-gray-500/5 py-12" : "py-14"
        }`}
      >
        <input {...getInputProps()} />
        <p className="sm:text-sm">
          {maxLimit ? (
            <span>
              You've reached the upload limit.
              <br />
              You can upload up to {maxFiles} images in total.
            </span>
          ) : (
            "Drag 'n' drop files, or click to select files"
          )}
        </p>
      </div>
      {/* <div className="flex flex-wrap justify-start px-2 mt-4 gap-4">
        {files.map((file: any, index: number) => {
          const objectURL = URL.createObjectURL(file);
          return (
            <ImagePreview
              key={index}
              image={objectURL}
              handleRemove={() => onRemoveFile(objectURL)}
              hasRemoveFn={true}
            />
          );
        })}
      </div> */}
    </div>
  );
}
