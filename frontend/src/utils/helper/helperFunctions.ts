import slugify from "slugify";
import { getAccessToken } from "./handleCookie";
import { getUserData } from "./localstorageHandler";

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

export const slugifyString = (str: string) => {
  const res = slugify(str, { replacement: "_", trim: true, lower: true });
  return res;
};

export const generateFileName = (
  file: File,
  folderName: string,
  uploadFor: string,
  title: string
) => {
  const { userId } = getUserData();
  const timeStamp = Date.now();
  const fileExt = getFileExt(file);
  const fileName = `${folderName}/${uploadFor}_${slugifyString(
    title
  )}_${userId}_${timeStamp}.${fileExt}`;
  return fileName;
};

export const getBucketFilepath = (file: string) => {
  const regex = /https:\/\/[^/]+\/storage\/v1\/object\/public\/([^/]+)\/(.+)/;
  const match = file.match(regex);
  if (match) return { bucketName: match[1], filePath: match[2] };
  return { bucketName: "", filePath: "" };
};

export const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-CA");
};
