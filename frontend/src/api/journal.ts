import { ApiResponse, JournalFormData } from "../utils";
import { apiFetch } from "./api";

export const allJournals = async () => {
  return apiFetch(
    `/journals`,
    {
      method: "GET",
    },
    true
  );
};

export const createJournal = async (
  formdata: JournalFormData
): Promise<ApiResponse> => {
  console.log("formdata in journal api", formdata);
  return apiFetch(
    `/journals`,
    {
      method: "POST",
      body: JSON.stringify(formdata),
    },
    true
  );
};
