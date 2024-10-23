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
