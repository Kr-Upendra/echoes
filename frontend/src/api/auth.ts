import {
  ApiResponse,
  ForgotPasswordFormData,
  LoginFromData,
  RegisterFromData,
  ResetPasswordFormData,
} from "../utils";
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

export const forgotPassword = async (
  formdata: ForgotPasswordFormData
): Promise<ApiResponse> => {
  return apiFetch("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(formdata),
  });
};

export const resetPassword = async (
  token: string,
  formdata: ResetPasswordFormData
): Promise<ApiResponse> => {
  return apiFetch(`/auth/reset-password/${token}`, {
    method: "PATCH",
    body: JSON.stringify(formdata),
  });
};
