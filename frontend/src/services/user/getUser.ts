import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
  expenses: any[];
  incomes: any[];
}

export const getUser = async (): Promise<User> => {
  return await fetchAPI<User>(ApiRoutes.USER);
};
