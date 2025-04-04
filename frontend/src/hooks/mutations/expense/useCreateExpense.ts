import { createExpense } from "@/services/expense/createExpense";
import { Operation, OperationInput } from "@/utils/interfaces/operation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<Operation, Error, OperationInput>({
    mutationFn: (data: OperationInput) => createExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
