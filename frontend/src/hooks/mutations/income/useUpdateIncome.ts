import { updateIncome } from "@/services/income/updateIncome";
import { Operation, OperationInput } from "@/utils/interfaces/operation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateIncome = () => {
  const queryClient = useQueryClient();

  return useMutation<Operation, Error, { id: string; data: Partial<OperationInput> }>({
    mutationFn: ({ id, data }) => updateIncome(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      queryClient.invalidateQueries({ queryKey: ["income", id] });
    },
  });
};
