import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { User } from "@/utils/interfaces/user";

interface UserResponse {
  message: string;
  data: {
    user: User;
  };
}

export const getUser = async (): Promise<UserResponse> => {
  return await fetchAPI<UserResponse>(ApiRoutes.USER);
};
