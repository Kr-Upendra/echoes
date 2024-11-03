import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ApiResponse, errorAlert, successAlert } from "../utils";

export const useUpdateItem = <T>(
  updateFn: (id: string, formdata: T) => Promise<ApiResponse>,
  queryKey?: string[],
  isNavigation: boolean = false,
  navigationLocation?: string
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, formdata }: { id: string; formdata: T }) =>
      updateFn(id, formdata),
    onSuccess: (response: ApiResponse) => {
      successAlert(response?.message);
      queryClient.invalidateQueries({ queryKey });
      if (isNavigation) {
        setTimeout(() => {
          navigate(navigationLocation || "/dashboard");
        }, 1000);
      }
    },
    onError: (error) => {
      errorAlert(error?.message);
    },
  });
};
