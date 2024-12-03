import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, errorAlert, successAlert } from "../utils";

export const useCreateItem = <T>(
  createFn: (formdata: T) => Promise<ApiResponse>,
  queryKey: string[],
  navigationLocation?: string
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formdata: T) => createFn(formdata),
    onSuccess: (response: ApiResponse) => {
      successAlert(response?.message);
      queryClient.invalidateQueries({ queryKey });
      setTimeout(() => {
        navigate(navigationLocation || "/dashboard");
      }, 1000);
    },
    onError: (error) => {
      errorAlert(error?.message);
    },
  });
};
