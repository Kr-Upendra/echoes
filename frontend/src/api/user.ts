import axios from "axios";
import {
  ApiResponse,
  BASE_URL,
  getAccessToken,
  UpdatePasswordFromData,
  UpdateProfileFormData,
} from "../utils";
import { apiFetch } from "./api";

export const getProfile = async () => {
  return apiFetch(
    "/users/profile",
    {
      method: "GET",
    },
    true
  );
};

export const userStats = async () => {
  return apiFetch(
    "/users/stat",
    {
      method: "GET",
    },
    true
  );
};

export const updatePassword = async (
  formdata: UpdatePasswordFromData
): Promise<ApiResponse> => {
  return apiFetch(
    "/users/update-password",
    {
      method: "POST",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const updateProfile = async (
  formdata: UpdateProfileFormData
): Promise<ApiResponse> => {
  const URL = `${BASE_URL}/users/update-profile`;
  const accesstoken = getAccessToken();
  const requestData = new FormData();

  if (formdata.profilePicture) {
    requestData.append("profile", formdata.profilePicture);
  }

  if (formdata.profileBanner) {
    requestData.append("banner", formdata.profileBanner);
  }

  if (formdata.firstName) {
    requestData.append("firstName", formdata.firstName);
  }
  if (formdata.lastName) {
    requestData.append("lastName", formdata.lastName);
  }
  if (formdata.about) {
    requestData.append("about", formdata.about);
  }

  try {
    const response = await axios.patch(URL, requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Profile update failed");
  }
};
