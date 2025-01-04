import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return await fetchAPI<LoginResponse>(ApiRoutes.AUTH_LOGIN, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
