import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  status?: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return await fetchAPI<LoginResponse>(ApiRoutes.AUTH_LOGIN, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
