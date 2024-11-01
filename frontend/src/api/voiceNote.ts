import { ApiResponse, IFilterArgs, VoiceNoteFormData } from "../utils";
import { apiFetch } from "./api";

export const allVoiceNotes = async ({
  search,
  page = 1,
  limit = 12,
  category,
}: IFilterArgs) => {
  const categoryQuery = category?.toLowerCase();
  const searchQuery = search?.toLowerCase();
  return apiFetch(
    `/voice-notes?page=${page}&limit=${limit}&search=${searchQuery}&category=${categoryQuery}`,
    {
      method: "GET",
    },
    true
  );
};

export const voiceNote = async (id: string) => {
  return apiFetch(
    `/voice-notes/${id}`,
    {
      method: "GET",
    },
    true
  );
};

export const createVoiceNote = async (
  formdata: VoiceNoteFormData
): Promise<ApiResponse> => {
  console.log("api voice note formdata: ", formdata);
  return apiFetch(
    `/voice-notes`,
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
    `/voice-notes/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const deleteVoiceNote = async (id: string) => {
  return apiFetch(
    `/voice-notes/${id}`,
    {
      method: "DELETE",
    },
    true
  );
};
