import slugify from "slugify";
import { getAccessToken } from "./handleCookie";
import { getUserData } from "./localstorageHandler";
import useScreenWidth from "../../hooks/useScreenWidth";

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

export const renderImageLength = () => {
  const screenWidth = useScreenWidth();
  let imageToRender;

  if (screenWidth > 1050) {
    imageToRender = 5;
  } else if (screenWidth > 750) {
    imageToRender = 3;
  } else if (screenWidth >= 481) {
    imageToRender = 3;
  } else {
    imageToRender = 5;
  }

  return imageToRender;
};

export const urlBase64ToUint8Array = (base64String: any) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const arrayBufferToBase64 = (arrayBuffer: ArrayBuffer) => {
  // Convert the ArrayBuffer (Uint8Array) to a string using String.fromCharCode
  const byteArray = new Uint8Array(arrayBuffer);
  let binaryString = "";

  // Convert each byte to its corresponding character code
  byteArray.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });

  // Return the base64 encoding of the binary string
  return btoa(binaryString);
};
