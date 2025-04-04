import { getIncomeById } from "@/services/income/getIncomeById";
import { Operation } from "@/utils/interfaces/operation";
import { useQuery } from "@tanstack/react-query";

export const useGetIncomeById = (id: string) => {
  return useQuery<Operation, Error>({
    queryKey: ["income", id],
    queryFn: () => getIncomeById(id),
    enabled: !!id,
  });
};
