import { errorAlert, getFileExt, supabase } from "../utils";
import { getUserData } from "../utils";

export const uploadFileToSupabase = async (
  file: File,
  bucket: string,
  uploadFor: string,
  oldImagePath?: string
) => {
  const { userId } = getUserData();
  const ext = getFileExt(file);
  const timestamp = Date.now();
  const filename = `${uploadFor}/user_${userId}_${timestamp}.${ext}`;

  if (oldImagePath) {
    const oldImage = oldImagePath.split("/").slice(8).join("/");

    console.log("oldimage: ", oldImage);
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove([oldImage]);

    console.log("deleteError ", deleteError);

    if (deleteError) {
      errorAlert(deleteError.message || "Failed to delete old image.");
      return;
    }
  }

  let { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filename, file);

  if (uploadError) {
    errorAlert(uploadError?.message || "Failed to upload file.");
    return;
  }

  console.log("filename: ", filename);

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data?.publicUrl;
};
