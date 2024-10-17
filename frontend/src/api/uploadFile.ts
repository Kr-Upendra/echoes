import { errorAlert, getFileExt, supabase } from "../utils";
import { getUserData } from "../utils";

export const uploadFileToSupabase = async (
  file: File,
  bucket: string,
  uploadFor: string
) => {
  const { userId } = getUserData();
  const ext = getFileExt(file);
  const timestamp = Date.now();
  const filename = `${uploadFor}/user_${userId}_${timestamp}.${ext}`;

  let { error } = await supabase.storage.from(bucket).upload(filename, file);

  if (error) {
    errorAlert(error?.message || "Failed to upload file.");
    return;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data?.publicUrl;
};
