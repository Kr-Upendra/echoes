import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, errorAlert, successAlert } from "../utils";

export const useDeleteItem = (
  deleteFn: (id: string) => Promise<ApiResponse>,
  queryKey: string[]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFn(id),
    onSuccess: (response: ApiResponse) => {
      successAlert(response?.message);
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      errorAlert(error?.message);
    },
  });
};
