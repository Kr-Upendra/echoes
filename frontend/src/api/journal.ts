import axios from "axios";
import {
  ApiResponse,
  BASE_URL,
  getAccessToken,
  JournalFormData,
  JournalUpdateFormData,
} from "../utils";
import { apiFetch } from "./api";

export const allJournals = async ({ date }: { date?: String } = {}) => {
  return apiFetch(
    `/journals?date=${date ? date : ""}`,
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
  const URL = `${BASE_URL}/journals`;
  const accesstoken = getAccessToken();
  const requestData = new FormData();

  if (formdata.title) {
    requestData.append("title", formdata.title);
  }

  if (formdata.content) {
    requestData.append("content", formdata.content);
  }

  if (formdata.tags && Array.isArray(formdata.tags)) {
    formdata.tags.forEach((tag) => {
      requestData.append("tags[]", tag);
    });
  }

  if (formdata.images && Array.isArray(formdata.images)) {
    formdata.images.forEach((file) => {
      console.log("file: ", file);
      if (file instanceof File) {
        requestData.append(`files`, file);
      }
    });
  }

  if (formdata.mood) {
    requestData.append("mood", formdata.mood);
  }

  try {
    const response = await axios.post(URL, requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accesstoken}`,
      },
      timeout: 30 * 1000,
    });
    return response.data;
  } catch (error) {
    throw new Error("INTERNAL SERVER ERROR WHILE CREATING JOURNAL.");
  }
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
