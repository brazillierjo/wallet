import { getExpenseById } from "@/services/expense/getExpenseById";
import { Operation } from "@/utils/interfaces/operation";
import { useQuery } from "@tanstack/react-query";

export const useGetExpenseById = (id: string) => {
  return useQuery<Operation, Error>({
    queryKey: ["expense", id],
    queryFn: () => getExpenseById(id),
    enabled: !!id,
  });
};
