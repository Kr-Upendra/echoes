import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ApiResponse, errorAlert, NoteFormData, successAlert } from "../utils";

export const useUpdateItem = (
  updateFn: (id: string, formdata: NoteFormData) => Promise<ApiResponse>,
  queryKey?: string[],
  isNavigation: boolean = false
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, formdata }: { id: string; formdata: NoteFormData }) =>
      updateFn(id, formdata),
    onSuccess: (response: ApiResponse) => {
      successAlert(response?.message);
      queryClient.invalidateQueries({ queryKey });
      if (isNavigation) {
        setTimeout(() => {
          navigate("/notes");
        }, 1000);
      }
    },
    onError: (error) => {
      errorAlert(error?.message);
    },
  });
};
