import { v2 as cloudinary } from "cloudinary";
import { generateFileName } from "../utils/index.js";

export const handleFileUpload = async (files, options = {}) => {
  if (!Array.isArray(files)) files = [files];

  const uploadedFiles = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uniqueFilename = generateFileName(
      options.dir,
      options.subFilename,
      i
    );

    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              public_id: uniqueFilename,
              folder: "user",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(file.buffer);
      });

      uploadedFiles.push(result.secure_url);
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  return uploadedFiles;
};
