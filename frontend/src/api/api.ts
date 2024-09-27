import { BASE_URL } from "../utils";

export const apiFetch = async (endpoint: string, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
