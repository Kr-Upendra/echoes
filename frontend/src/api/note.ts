import { ApiResponse, NoteFormData } from "../utils";
import { apiFetch } from "./api";

export const allNotes = async () => {
  return apiFetch(
    "/notes",
    {
      method: "GET",
    },
    true
  );
};

export const createNote = async (
  id: string,
  formdata: NoteFormData
): Promise<ApiResponse> => {
  return apiFetch(
    `/notes/${id}`,
    {
      method: "POST",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const updateNote = async (
  id: string,
  formdata: NoteFormData
): Promise<ApiResponse> => {
  return apiFetch(
    `/notes/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const deleteNote = async (id: string) => {
  return apiFetch(
    `/notes/${id}`,
    {
      method: "DELETE",
    },
    true
  );
};
