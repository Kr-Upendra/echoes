import { ApiResponse, LoginFromData, RegisterFromData } from "../utils";
import { apiFetch } from "./api";

export const registerUser = async (
  formdata: RegisterFromData
): Promise<ApiResponse> => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(formdata),
  });
};

export const loginUser = async (
  formdata: LoginFromData
): Promise<ApiResponse> => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(formdata),
  });
};

export const getVapidKey = async (): Promise<ApiResponse> => {
  return apiFetch("/push/vapidPublicKey", { method: "GET" });
};
