import { ApiRoutes } from "@/router/api_routes";
import fetchApi from "@/utils/fetchApi";
import { Operation, OperationInput } from "@/utils/interfaces/operation";
import { OperationType } from "@/utils/requestCheck";

const getApiRoute = (operationType: OperationType) => {
  return operationType === OperationType.INCOMES ? ApiRoutes.INCOMES : ApiRoutes.EXPENSES;
};

export const fetchOperations = async (operationType: OperationType): Promise<Operation[]> => {
  const response = await fetchApi<Operation[]>(getApiRoute(operationType), "GET");
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message || "Error fetching operations");
  }
};

export const createOperation = async (
  operationType: OperationType,
  operationData: OperationInput
): Promise<Operation> => {
  const response = await fetchApi<Operation>(getApiRoute(operationType), "POST", operationData);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message || "Error creating operation");
  }
};

export const updateOperation = async (
  operationType: OperationType,
  id: number,
  operationData: OperationInput
): Promise<Operation> => {
  const response = await fetchApi<Operation>(`${getApiRoute(operationType)}/${id}`, "PATCH", operationData);
  if (response.data) {
    return response.data;
  } else {
    throw new Error(response.message || "Error updating operation");
  }
};

export const deleteOperation = async (operationType: OperationType, id: number): Promise<void> => {
  const response = await fetchApi<void>(`${getApiRoute(operationType)}/${id}`, "DELETE");
  if (!response.data) {
    throw new Error(response.message || "Error deleting operation");
  }
};
