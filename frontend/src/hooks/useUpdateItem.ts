import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, errorAlert, NoteFormData, successAlert } from "../utils";

export const useUpdateItem = (
  updateFn: (id: string, formdata: NoteFormData) => Promise<ApiResponse>,
  queryKey: string[]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formdata }: { id: string; formdata: NoteFormData }) =>
      updateFn(id, formdata),
    onSuccess: (response: ApiResponse) => {
      successAlert(response?.message);
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      errorAlert(error?.message);
    },
  });
};
