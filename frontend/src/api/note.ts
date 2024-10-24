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
