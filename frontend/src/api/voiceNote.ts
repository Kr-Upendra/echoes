import { ApiResponse, VoiceNoteFormData } from "../utils";
import { apiFetch } from "./api";

export const createVoiceNote = async (
  formdata: VoiceNoteFormData
): Promise<ApiResponse> => {
  console.log("api voice note formdata: ", formdata);
  return apiFetch(
    `/notes`,
    {
      method: "POST",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const updateVoiceNote = async (
  id: string,
  formdata: VoiceNoteFormData
): Promise<ApiResponse> => {
  console.log({ updateId: id, updateFormData: formdata });
  return apiFetch(
    `/notes/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(formdata),
    },
    true
  );
};
