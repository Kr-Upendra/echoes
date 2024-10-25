import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, errorAlert, successAlert } from "../utils";
import { useNavigate } from "react-router-dom";

export const useCreateItem = <T>(
  updateFn: (formdata: T) => Promise<ApiResponse>,
  queryKey: string[]
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formdata: T) => updateFn(formdata),
    onSuccess: (response: ApiResponse) => {
      successAlert(response?.message);
      queryClient.invalidateQueries({ queryKey });
      setTimeout(() => {
        navigate("/notes");
      }, 1000);
    },
    onError: (error) => {
      errorAlert(error?.message);
    },
  });
};
