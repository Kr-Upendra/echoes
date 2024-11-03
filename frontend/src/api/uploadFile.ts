import { errorAlert, supabase } from "../utils";

export const uploadImage = async (
  file: File,
  bucket: string,
  filename: string,
  oldImagePath?: string
) => {
  if (oldImagePath) {
    const oldImage = oldImagePath.split("/").slice(8).join("/");
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove([oldImage]);

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

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data?.publicUrl;
};

// export const uploadAudio = async (
//   file: File,
//   bucket: string,
//   fileName: string,
//   oldFile?: string
// ) => {
//   console.log(oldFile);
//   let { error: uploadError } = await supabase.storage
//     .from(bucket)
//     .upload(fileName, file);

//   if (uploadError) {
//     errorAlert(uploadError?.message || "Failed to upload file.");
//     return;
//   }

//   const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
//   return data?.publicUrl;
// };
