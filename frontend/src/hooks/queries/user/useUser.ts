import { User } from "@/utils/interfaces/user";
import { useQuery } from "@tanstack/react-query";

// This is a placeholder function. Replace with your actual API call
const fetchUser = async (): Promise<User> => {
  // Replace with your actual API endpoint
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
