import { ApiResponse } from "../utils";
import { apiFetch } from "./api";

export const getVapidKey = async (): Promise<ApiResponse> => {
  return apiFetch("/push/vapid-key", { method: "GET" });
};

export const sendSubscription = async (formdata: any): Promise<ApiResponse> => {
  return apiFetch("/push/subscribe", {
    method: "POST",
    body: JSON.stringify(formdata),
  });
};

export const sendNotification = async (): Promise<ApiResponse> => {
  return apiFetch("/push/send-notification", {
    method: "POST",
  });
};
