import axios, { AxiosProgressEvent } from "axios";
import {
  ApiResponse,
  BASE_URL,
  getAccessToken,
  UpdatePasswordFromData,
  UpdateProfileFormData,
  UpdateProfileImageFormData,
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

export const updateProfileDetails = async (
  formdata: UpdateProfileFormData
): Promise<ApiResponse> => {
  return apiFetch(
    "/users/update-profile",
    {
      method: "PATCH",
      body: JSON.stringify(formdata),
    },
    true
  );
};

export const updateProfileImages = async ({
  onProgress,
  profileBanner,
  profilePicture,
}: UpdateProfileImageFormData) => {
  const URL = `${BASE_URL}/users/update-profile`;
  const accesstoken = getAccessToken();
  const requestData = new FormData();

  if (profilePicture) {
    requestData.append("profile", profilePicture);
  }

  if (profileBanner) {
    requestData.append("banner", profileBanner);
  }

  try {
    const response = await axios.patch(URL, requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accesstoken}`,
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total!) * 100
        );
        onProgress(progress);
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Profile update failed");
  }
};
