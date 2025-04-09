import { getExpenses } from "@/services/expense/getExpenses";
import { Operation } from "@/utils/interfaces/operation";
import { useQuery } from "@tanstack/react-query";

export const useGetExpenses = () => {
  return useQuery<Operation[], Error>({
    queryKey: ["expenses"],
    queryFn: async () => {
      try {
        const response = await getExpenses();
        return response.data;
      } catch (error) {
        // Return empty array instead of throwing error
        return [];
      }
    },
  });
};
