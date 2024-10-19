import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  errorAlert,
  successAlert,
  UpdateProfileFormData,
  warnAlert,
} from "../../utils";
import { uploadFileToSupabase } from "../../api";

type UpdateProfileMutationFunction = (
  formdata: UpdateProfileFormData
) => Promise<ApiResponse>;

type Props = {
  onClose: () => void;
  mutationFunction: UpdateProfileMutationFunction;
  title?: string;
  maxFiles?: number;
  bucketName: string;
  dirName: string;
  imageKey: string;
  maxFileSize: number;
};

interface FileWithPreview extends File {
  preview: string;
}

export default function ImageUploader({
  onClose,
  mutationFunction,
  title,
  maxFiles = 1,
  bucketName,
  dirName,
  imageKey,
  maxFileSize,
}: Props) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFiles,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const fileSize = acceptedFiles[0].size;
      if (fileSize > maxFileSize) {
        warnAlert(`File size exceeds ${maxFileSize} KB limit.`);
        return;
      }

      const newFile = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }) as FileWithPreview;
      setFile(newFile);
    },
  });

  const mutation = useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      successAlert("Image uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
      setFile(null);
      onClose();
    },
    onError: (error: any) => {
      errorAlert(error.message || "An error occurred while uploading.");
    },
  });

  const handleUpload = async () => {
    if (!file) {
      errorAlert("Please select a file to upload.");
      return;
    }

    try {
      const publicUrl = await uploadFileToSupabase(file, bucketName, dirName);
      if (publicUrl) {
        const formData = { [imageKey]: publicUrl };
        mutation.mutate(formData);
      } else {
        errorAlert("Failed to retrieve the uploaded file URL.");
      }
    } catch (error) {
      errorAlert("Failed to upload file.");
    }
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file?.preview);
      }
    };
  }, [file]);
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-screen flex justify-center items-center bg-black/10 backdrop-blur-sm">
      <div className="w-[40%] lg:w-[50%] md:w-[60%] sm:w-[80%] xs:w-[95%] py-10 px-6 rounded-xl bg-black border-green-500/20 border">
        <h1 className="mb-4 font-display text-center">{title}</h1>
        <div
          {...getRootProps()}
          className="text-center font-display py-14 md:py-12 sm:py-10 px-4 rounded-md bg-green-200/5 shadow-lg shadow-black/10"
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop file, or click to select file</p>
        </div>
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          {file && (
            <div className="w-14 h-14 rounded-lg overflow-hidden">
              <img
                src={file?.preview}
                alt={file?.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="mt-4 text-center flex gap-3">
          <button
            onClick={onClose}
            className="font-display text-white bg-[#DC3545] w-full py-1.5 rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="font-display text-white bg-green-600 w-full py-1.5 rounded-full"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
