import { BASE_URL, getAccessToken } from "../utils";

export const apiFetch = async (
  endpoint: string,
  options = {},
  token?: boolean
) => {
  let header: any = {
    "Content-Type": "application/json",
  };

  if (token) {
    const accesstoken = getAccessToken();
    if (accesstoken) header.Authorization = `Bearer ${accesstoken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...header,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
