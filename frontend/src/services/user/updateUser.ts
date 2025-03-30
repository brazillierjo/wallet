import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { User } from "@/utils/interfaces/user";

interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}

interface UpdateUserResponse {
  message: string;
  data: {
    user: User;
  };
}

export const updateUser = async (data: UpdateUserRequest): Promise<UpdateUserResponse> => {
  return await fetchAPI<UpdateUserResponse>(ApiRoutes.USER, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
