import {
  errorAlert,
  getBucketFilepath,
  getFileExt,
  getUserData,
} from "../utils";

export const uploadImage = async (
  file: File,
  bucket: string,
  filename: string,
  oldImagePath?: string
) => {
  return "";
};

export const uploadMultipleFiles = async (
  images: File[],
  journalId: string
) => {};

export const deleteFiles = async (files: string[]) => {
  // try {
  //   const deletePromises = files.map(async (file: string) => {
  //     const { bucketName, filePath } = getBucketFilepath(file);
  //     if (bucketName !== "" || filePath !== "") {
  //       const { error: deleteError } = await supabase.storage
  //         .from(bucketName)
  //         .remove([filePath]);
  //       if (deleteError) {
  //         throw deleteError;
  //       }
  //     }
  //   });
  //   await Promise.all(deletePromises);
  // } catch (err) {
  //   console.error("Error uploading images:", err);
  //   throw new Error(
  //     "There was an error uploading the images. please try again later."
  //   );
  // }
};
