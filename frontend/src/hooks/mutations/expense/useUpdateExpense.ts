import { updateExpense } from "@/services/expense/updateExpense";
import { Operation, OperationInput } from "@/utils/interfaces/operation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<Operation, Error, { id: string; data: Partial<OperationInput> }>({
    mutationFn: ({ id, data }) => updateExpense(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["expense", id] });
    },
  });
};
