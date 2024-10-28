import { getAccessToken } from "./handleCookie";

export const getFileExt = (file: File) => {
  const parts = file.name.split(".");
  return parts.length > 1 ? parts.pop() : "";
};

export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken();
  return !!accessToken;
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
