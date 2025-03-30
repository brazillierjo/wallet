import { getUser, User } from "@/services/user/getUser";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
};
