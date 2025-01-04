import { logout } from "@/services/auth/logout";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useLogout = (): UseMutationResult<void, Error, string> => {
  return useMutation<void, Error, string>({
    mutationFn: (refreshToken: string) => logout(refreshToken),
    onError: (error: Error) => {
      console.error("Error during logout:", error.message);
    },
  });
};
