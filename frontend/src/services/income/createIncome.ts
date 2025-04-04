import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { Operation, OperationInput } from "@/utils/interfaces/operation";

export const createIncome = async (data: OperationInput): Promise<Operation> => {
  return await fetchAPI<Operation>(ApiRoutes.INCOMES, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
