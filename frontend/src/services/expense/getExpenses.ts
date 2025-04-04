import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { Operation } from "@/utils/interfaces/operation";

interface GetExpensesResponse {
  message: string;
  data: Operation[];
}

export const getExpenses = async (): Promise<GetExpensesResponse> => {
  return await fetchAPI<GetExpensesResponse>(ApiRoutes.EXPENSES, {
    method: "GET",
  });
};
