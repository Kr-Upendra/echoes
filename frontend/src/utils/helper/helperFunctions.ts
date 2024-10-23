import { getAccessToken } from "./handleCookie";

export const getFileExt = (file: File) => {
  const parts = file.name.split(".");
  return parts.length > 1 ? parts.pop() : "";
};

export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();
  return !!accessToken;
};
