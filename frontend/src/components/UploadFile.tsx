import { useDropzone } from "react-dropzone";
import { errorAlert, FileWithPreview, warnAlert } from "../utils";
import { useEffect, useState } from "react";
import ImagePreview from "./views/ImagePreivew";

interface IUploadFile {
  onClose: () => void;
}

export default function UploadFile({ onClose }: IUploadFile) {
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },

    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const fileSize = file.size;

      if (fileSize > 500 * 1024) {
        warnAlert(`File size should not exceed 500 KB.`);
        return;
      }

      const image = new Image();
      const objectURL = URL.createObjectURL(file);

      const newFile = Object.assign(file, {
        preview: objectURL,
      }) as FileWithPreview;
      setFile(newFile);

      image.onerror = () => {
        warnAlert("Invalid image file.");
      };

      image.src = objectURL;
    },
  });

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file?.preview);
      }
    };
  }, [file]);

  const handleUpload = async () => {
    if (!file) {
      errorAlert("Please select a file to upload.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
    } catch (error) {
      errorAlert("Failed to upload file.");
    }
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen flex justify-center items-center bg-black/10 backdrop-blur-sm">
      <div className=" w-[40%] lg:w-[50%] md:w-[60%] sm:w-[80%] xs:w-[95%] py-10 px-6 rounded-xl bg-black border-green-500 border">
        <h1 className="mb-4 font-display text-center">
          Upload your profile picture
        </h1>
        <div
          {...getRootProps()}
          className="text-center font-display py-14 md:py-12 sm:py-10 px-4 rounded-md bg-green-200/5 shadow-lg shadow-black/10"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop file, or click to select file</p>
          <p className="mt-2 text-sm text-gray-700">
            <strong>File Size:</strong> Max file size is 500 KB
          </p>
        </div>
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          {file && (
            <ImagePreview
              image={file.preview}
              imageName="Preview"
              containerStyles="w-14 h-14"
            />
          )}
        </div>
        <div className="mt-4 text-center flex gap-3">
          <button
            onClick={onClose}
            // disabled={mutation?.isPending}
            className="font-display text-white bg-[#DC3545] w-full py-1.5 rounded-full"
          >
            Cancel
          </button>
          <button
            // onClick={handleUpload}
            disabled={!file}
            className="font-display text-white bg-green-600 disabled:bg-gray-700 w-full py-1.5 rounded-full"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
