import { login, LoginRequest, LoginResponse } from "@/services/auth/login";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => login(data),
  });
};
