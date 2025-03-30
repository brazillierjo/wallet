import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  return await fetchAPI<RegisterResponse>(ApiRoutes.AUTH_REGISTER, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
