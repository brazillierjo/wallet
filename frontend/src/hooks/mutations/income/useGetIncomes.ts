import { getIncomes } from "@/services/income/getIncomes";
import { Operation } from "@/utils/interfaces/operation";
import { useQuery } from "@tanstack/react-query";

export const useGetIncomes = () => {
  return useQuery<Operation[], Error>({
    queryKey: ["incomes"],
    queryFn: async () => {
      try {
        const response = await getIncomes();
        return response.data;
      } catch (error) {
        // Return empty array instead of throwing error
        return [];
      }
    },
  });
};
