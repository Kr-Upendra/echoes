import { ApiResponse } from "../utils";
import { apiFetch } from "./api";

export const categories = async (): Promise<ApiResponse> => {
  return apiFetch(
    "/categories",
    {
      method: "GET",
    },
    true
  );
};
