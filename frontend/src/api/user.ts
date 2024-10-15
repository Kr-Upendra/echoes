import { ApiResponse, UpdatePasswordFromData } from "../utils";
import { apiFetch } from "./api";

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
