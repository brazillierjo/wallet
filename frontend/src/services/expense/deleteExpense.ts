import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export const deleteExpense = async (id: string): Promise<void> => {
  await fetchAPI(`${ApiRoutes.EXPENSES}/${id}`, {
    method: "DELETE",
  });
};
