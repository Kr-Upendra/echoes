import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, errorAlert, NoteFormData, successAlert } from "../utils";
import { useNavigate } from "react-router-dom";

export const useCreateItem = (
  updateFn: (formdata: NoteFormData) => Promise<ApiResponse>,
  queryKey: string[]
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formdata: NoteFormData) => updateFn(formdata),
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
