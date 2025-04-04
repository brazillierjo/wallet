import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";
import { Operation, OperationInput } from "@/utils/interfaces/operation";

export const updateIncome = async (id: string, data: Partial<OperationInput>): Promise<Operation> => {
  return await fetchAPI<Operation>(`${ApiRoutes.INCOMES}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
