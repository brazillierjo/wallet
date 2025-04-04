import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { Operation } from "@/utils/interfaces/operation";

export const getExpenses = async (): Promise<Operation[]> => {
  return await fetchAPI<Operation[]>(ApiRoutes.EXPENSES, {
    method: "GET",
  });
};
