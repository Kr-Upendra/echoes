import { errorAlert, supabase } from "../utils";

export const uploadFileToSupabase = async (file: File, path: string) => {
  let { error } = await supabase.storage.from("avatar").upload(path, file);

  if (error) {
    errorAlert(error?.message || "Failed to upload file.");
    return;
  }

  const { data } = supabase.storage.from("avatar").getPublicUrl(path);
  return data?.publicUrl;
};
