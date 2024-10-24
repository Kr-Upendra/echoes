import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, errorAlert, NoteFormData, successAlert } from "../utils";

export const useUpdateItem = (
  updateFn: (formdata: NoteFormData, id: string) => Promise<ApiResponse>,
  queryKey: string[]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formdata, id }: { formdata: any; id: string }) =>
      updateFn(formdata, id),
    onSuccess: (response: ApiResponse) => {
      if (response.status === "success") {
        successAlert(response?.message);
        queryClient.invalidateQueries({ queryKey });
      }
    },
    onError: (error) => {
      console.log(error);
      errorAlert(error?.message);
    },
  });
};
