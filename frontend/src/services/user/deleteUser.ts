import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export const deleteUser = async (): Promise<void> => {
  return await fetchAPI<void>(ApiRoutes.USER_DELETE, {
    method: "DELETE",
  });
};
