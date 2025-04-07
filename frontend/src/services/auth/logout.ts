import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export const logout = async (): Promise<void> => {
  return await fetchAPI<void>(ApiRoutes.AUTH_LOGOUT, {
    method: "POST",
    body: JSON.stringify({}),
  });
};
