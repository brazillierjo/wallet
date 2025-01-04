import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export const logout = async (refreshToken: string): Promise<void> => {
  return await fetchAPI<void>(ApiRoutes.AUTH_LOGOUT, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
};
