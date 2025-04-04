import { getIncomes } from "@/services/income/getIncomes";
import { Operation } from "@/utils/interfaces/operation";
import { useQuery } from "@tanstack/react-query";

interface GetIncomesResponse {
  message: string;
  data: Operation[];
}

export const useGetIncomes = () => {
  return useQuery<Operation[], Error>({
    queryKey: ["incomes"],
    queryFn: async () => {
      const response = await getIncomes();
      return response.data;
    },
  });
};
