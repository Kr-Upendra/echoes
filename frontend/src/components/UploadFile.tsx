import { useDropzone } from "react-dropzone";
import {
  ApiResponse,
  errorAlert,
  successAlert,
  UpdateProfileImageFormData,
  warnAlert,
} from "../utils";
import { useState } from "react";
import ImagePreview from "./views/ImagePreivew";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateProfileMutationFunction = (
  args: UpdateProfileImageFormData
) => Promise<ApiResponse>;

interface IUploadFile {
  onClose: () => void;
  mutationFunction: UpdateProfileMutationFunction;
  cardTitle: string;
  uploadFor: string;
}

export default function UploadFile({
  onClose,
  mutationFunction,
  cardTitle,
  uploadFor,
}: IUploadFile) {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      successAlert(`Profile ${uploadFor} updated successfully.`);
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
      setFile(null);
      onClose();
    },
    onError: (error: any) => {
      errorAlert(error.message || "An error occurred while uploading.");
    },
  });

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
      setFilePreview(objectURL);
      setFile(file);

      image.onerror = () => {
        warnAlert("Invalid image file.");
      };
    },
  });

  const handleUpload = async () => {
    if (!file) {
      errorAlert("Please select a file to upload.");
      return;
    }
    try {
      if (uploadFor.includes("profile"))
        mutation.mutate({ profilePicture: file, onProgress: setProgress });
      else mutation.mutate({ profileBanner: file, onProgress: setProgress });
    } catch (error) {
      errorAlert("Failed to upload file.");
    }
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen flex justify-center items-center bg-black/10 backdrop-blur-sm">
      <div className=" w-[40%] lg:w-[50%] md:w-[60%] sm:w-[80%] xs:w-[95%] py-10 px-6 rounded-xl bg-black border-green-500 border">
        <h1 className="mb-4 font-display text-center">{cardTitle}</h1>
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
              image={filePreview}
              imageName="Preview"
              containerStyles="w-14 h-14"
            />
          )}
        </div>
        {mutation.isPending && (
          <div className="flex items-center justify-between mt-2.5">
            <div className="relative h-2 rounded-full bg-green-200/10 flex-1">
              <div
                className={`absolute top-0 left-0 rounded-full h-full bg-green-500/70`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-display ml-1.5">{progress} %</span>
          </div>
        )}
        <div className="mt-4 text-center flex gap-3">
          <button
            onClick={onClose}
            disabled={mutation.isPending}
            className="font-display text-white bg-[#DC3545] w-full py-1.5 rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || mutation.isPending}
            className="font-display text-white bg-green-600 disabled:bg-gray-700 w-full py-1.5 rounded-full"
          >
            {mutation.isPending ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
