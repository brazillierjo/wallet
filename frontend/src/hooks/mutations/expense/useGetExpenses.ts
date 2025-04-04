import { getExpenses } from "@/services/expense/getExpenses";
import { Operation } from "@/utils/interfaces/operation";
import { useQuery } from "@tanstack/react-query";

interface GetExpensesResponse {
  message: string;
  data: Operation[];
}

export const useGetExpenses = () => {
  return useQuery<Operation[], Error>({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await getExpenses();
      return response.data;
    },
  });
};
