import { ApiResponse, JournalFormData, JournalUpdateFormData } from "../utils";
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

export const singleJournal = async (id: string) => {
  return apiFetch(
    `/journals/${id}`,
    {
      method: "GET",
    },
    true
  );
};

export const createJournal = async (
  formdata: JournalFormData
): Promise<ApiResponse> => {
  return apiFetch(
    `/journals`,
    {
      method: "POST",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const updateJournal = async (
  id: string,
  formdata: JournalUpdateFormData
): Promise<ApiResponse> => {
  return apiFetch(
    `/journals/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const deleteJournal = async (id: string) => {
  return apiFetch(
    `/journals/${id}`,
    {
      method: "DELETE",
    },
    true
  );
};
