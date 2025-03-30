import { getUser } from "@/services/user/getUser";
import { User } from "@/utils/interfaces/user";
import { useQuery } from "@tanstack/react-query";

interface UserResponse {
  message: string;
  data: {
    user: User;
  };
}

export const useGetUser = () => {
  return useQuery<UserResponse, Error>({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
};
