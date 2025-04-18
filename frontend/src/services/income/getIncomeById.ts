import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { Operation } from "@/utils/interfaces/operation";

export const getIncomeById = async (id: string): Promise<Operation> => {
  return await fetchAPI<Operation>(`${ApiRoutes.INCOMES}/${id}`, {
    method: "GET",
  });
};
