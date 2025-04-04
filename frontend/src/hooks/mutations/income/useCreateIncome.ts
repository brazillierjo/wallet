import { createIncome } from "@/services/income/createIncome";
import { Operation, OperationInput } from "@/utils/interfaces/operation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateIncome = () => {
  const queryClient = useQueryClient();

  return useMutation<Operation, Error, OperationInput>({
    mutationFn: (data: OperationInput) => createIncome(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
};
