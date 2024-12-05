import { ApiResponse, IFilterArgs, NoteFormData } from "../utils";
import { apiFetch } from "./api";

export const allNotes = async ({
  search,
  page = 1,
  limit = 12,
}: IFilterArgs) => {
  const searchQuery = search?.toLowerCase();
  return apiFetch(
    `/notes?page=${page}&limit=${limit}&search=${searchQuery}`,
    {
      method: "GET",
    },
    true
  );
};

export const note = async (id: string) => {
  return apiFetch(
    `/notes/${id}`,
    {
      method: "GET",
    },
    true
  );
};

export const createNote = async (
  formdata: NoteFormData
): Promise<ApiResponse> => {
  return apiFetch(
    `/notes`,
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
