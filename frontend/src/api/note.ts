import { ApiResponse, NoteFormDataWithId } from "../utils";
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

export const createNote = async ({
  formdata,
  id,
}: NoteFormDataWithId): Promise<ApiResponse> => {
  console.log({ formdata, id });
  return apiFetch(
    `/notes/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const updateNote = async ({
  formdata,
  id,
}: NoteFormDataWithId): Promise<ApiResponse> => {
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
  console.log("api id:", id);
  return apiFetch(
    `/notes/${id}`,
    {
      method: "DELETE",
    },
    true
  );
};
