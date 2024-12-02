import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../utils";

export const useGetItem = (
  queryKeys: string[],
  queryFun: () => Promise<ApiResponse>
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys,
    queryFn: queryFun,
  });

  return { data: data?.data, isLoading, error };
};
