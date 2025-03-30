import { getUser } from "@/services/user/getUser";
import { User } from "@/utils/interfaces/user";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface UserResponse {
  message: string;
  data: {
    user: User;
  };
}

interface ApiError {
  status: string;
  message: string;
}

export const useGetUser = () => {
  return useQuery<UserResponse, ApiError>({
    queryKey: ["user"],
    queryFn: getUser,
  } as UseQueryOptions<UserResponse, ApiError>);
};
