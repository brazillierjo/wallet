import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
  isSubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
  expenses: any[];
  incomes: any[];
}

interface UserResponse {
  message: string;
  data: {
    user: User;
  };
}

export const useUser = () => {
  const { data, isLoading, error } = useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: () => fetchAPI(ApiRoutes.USER),
  });

  console.log(data);

  return {
    user: data?.data.user,
    isLoading,
    error: error ? "Failed to fetch user data" : null,
  };
};
