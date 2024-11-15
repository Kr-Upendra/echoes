import {
  errorAlert,
  getBucketFilepath,
  getFileExt,
  getUserData,
  supabase,
  supabaseJournalsBucket,
} from "../utils";

export const uploadImage = async (
  file: File,
  bucket: string,
  filename: string,
  oldImagePath?: string
) => {
  if (oldImagePath) {
    await deleteFiles([oldImagePath]);
  }

  let { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filename, file);

  if (uploadError) {
    errorAlert(uploadError?.message || "Failed to upload file.");
    return;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data?.publicUrl;
};

export const uploadMultipleFiles = async (
  images: File[],
  journalId: string
) => {
  const { userId, username } = getUserData();
  const dir = `${userId}_userid/${journalId}_journalid`;
  const uploadedFiles: string[] = [];

  try {
    const uploadPromises = images.map(async (image) => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExt = getFileExt(image);
      const fileName = `/images/journal_${username}_${timestamp}_${randomString}.${fileExt}`;
      const fileNameWithDir = dir + fileName;

      const { error } = await supabase.storage
        .from(supabaseJournalsBucket)
        .upload(fileNameWithDir, image);

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from(supabaseJournalsBucket)
        .getPublicUrl(fileNameWithDir);

      uploadedFiles.push(publicUrl);
    });

    await Promise.all(uploadPromises);

    return uploadedFiles;
  } catch (err) {
    console.error("Error uploading images:", err);
    throw new Error("There was an error uploading the images.");
  }
};

export const deleteFiles = async (files: string[]) => {
  try {
    const deletePromises = files.map(async (file: string) => {
      const { bucketName, filePath } = getBucketFilepath(file);
      if (bucketName !== "" || filePath !== "") {
        const { error: deleteError } = await supabase.storage
          .from(bucketName)
          .remove([filePath]);

        if (deleteError) {
          throw deleteError;
        }
      }
    });

    await Promise.all(deletePromises);
  } catch (err) {
    console.error("Error uploading images:", err);
    throw new Error("There was an error uploading the images.");
  }
};
