import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ApiResponse,
  errorAlert,
  generateFileName,
  ImageProperties,
  successAlert,
  UpdateProfileFormData,
  warnAlert,
} from "../../utils";
import { uploadImage } from "../../api";
import ImagePreview from "../views/ImagePreivew";

type UpdateProfileMutationFunction = (
  formdata: UpdateProfileFormData
) => Promise<ApiResponse>;

type Props = {
  onClose: () => void;
  mutationFunction: UpdateProfileMutationFunction;
  title?: string;
  maxFiles?: number;
  imageProperties: ImageProperties;
  oldImagePath?: string;
};

interface FileWithPreview extends File {
  preview: string;
}

export default function ImageUploader({
  onClose,
  mutationFunction,
  title,
  maxFiles = 1,
  imageProperties,
  oldImagePath,
}: Props) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFiles,
    accept: imageProperties.acceptedTypes,
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const maxFileSize = imageProperties?.fileSize?.max;
      const minFileSize = imageProperties?.fileSize?.min;

      const fileSize = file.size;

      if (fileSize > maxFileSize) {
        warnAlert(`File size should not exceed ${maxFileSize / 1024} KB.`);
        return;
      }

      if (fileSize < minFileSize) {
        warnAlert(`File size should be at least ${minFileSize / 1024} KB.`);
        return;
      }

      const image = new Image();
      const objectURL = URL.createObjectURL(file);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        const maxWidth = imageProperties?.dimension?.width?.max;
        const minWidth = imageProperties?.dimension?.width?.min;
        const maxHeight = imageProperties?.dimension?.height?.max;
        const minHeight = imageProperties?.dimension?.height?.min;

        if (width > maxWidth || height > maxHeight) {
          warnAlert(
            `Image dimensions should not exceed ${maxWidth}x${maxHeight} pixels.`
          );
          return;
        }

        if (width < minWidth || height < minHeight) {
          warnAlert(
            `Image dimensions should be at least ${minWidth}x${minHeight} pixels.`
          );
          return;
        }

        const newFile = Object.assign(file, {
          preview: objectURL,
        }) as FileWithPreview;
        setFile(newFile);
      };

      image.onerror = () => {
        warnAlert("Invalid image file.");
      };

      image.src = objectURL;
    },
  });

  const mutation = useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      if (title?.includes("profile")) {
        successAlert("Profile picture updated successfully.");
      } else {
        successAlert("Banner updated successfully.");
      }
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
      const filename = generateFileName(
        file,
        imageProperties?.dirName,
        imageProperties?.preTitle,
        imageProperties?.keyName
      );

      const publicUrl = await uploadImage(
        file,
        imageProperties?.bucketName,
        filename,
        oldImagePath
      );
      if (publicUrl) {
        const formData = { [imageProperties?.formValue]: publicUrl };
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
          <p className="mt-2 text-sm text-gray-700">
            <strong>File Size:</strong> {imageProperties?.fileSize?.min / 1024}{" "}
            KB - {imageProperties?.fileSize?.max / 1024} KB
          </p>
          <p className="mt-2 text-sm text-gray-700">
            <strong>Dimensions:</strong> min&nbsp;
            {imageProperties?.dimension?.width?.min} x&nbsp;
            {imageProperties?.dimension?.height?.min} px, max &nbsp;
            {imageProperties?.dimension?.width?.max} x&nbsp;
            {imageProperties?.dimension?.height?.max}&nbsp;px
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
            disabled={mutation?.isPending}
            className="font-display text-white bg-[#DC3545] w-full py-1.5 rounded-full"
          >
            Cancel
          </button>
          <button
            disabled={mutation?.isPending}
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
