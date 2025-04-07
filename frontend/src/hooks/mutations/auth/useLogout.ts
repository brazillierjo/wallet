import { logout } from "@/services/auth/logout";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useLogout = (): UseMutationResult<void, Error, void> => {
  return useMutation<void, Error, void>({
    mutationFn: () => logout(),
    onError: (error: Error) => {
      console.error("Error during logout:", error.message);
    },
  });
};
