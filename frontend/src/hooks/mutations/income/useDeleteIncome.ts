import { deleteIncome } from "@/services/income/deleteIncome";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteIncome = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteIncome(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      queryClient.invalidateQueries({ queryKey: ["income", id] });
    },
  });
};
