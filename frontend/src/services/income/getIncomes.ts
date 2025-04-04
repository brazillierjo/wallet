import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { Operation } from "@/utils/interfaces/operation";

interface GetIncomesResponse {
  message: string;
  data: Operation[];
}

export const getIncomes = async (): Promise<GetIncomesResponse> => {
  return await fetchAPI<GetIncomesResponse>(ApiRoutes.INCOMES, {
    method: "GET",
  });
};
