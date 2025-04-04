import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export const deleteIncome = async (id: string): Promise<void> => {
  await fetchAPI(`${ApiRoutes.INCOMES}/${id}`, {
    method: "DELETE",
  });
};
