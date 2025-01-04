import { register, RegisterRequest, RegisterResponse } from "@/services/auth/register";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useRegister = (): UseMutationResult<RegisterResponse, Error, RegisterRequest> => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: () => {
      console.log("User registered successfully");
    },
    onError: (error: Error) => {
      console.error("Error during registration:", error.message);
    },
  });
};
