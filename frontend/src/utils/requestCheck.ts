export enum OperationType {
  INCOMES = "incomes",
  EXPENSES = "expenses",
}

export function requestCheck(body: { label: string; amount: number }, type: string) {
  const { label, amount } = body;

  if (type !== OperationType.INCOMES && type !== OperationType.EXPENSES) {
    throw new Error("Invalid type");
  }

  if (!label || typeof label !== "string") {
    throw new Error("Invalid label");
  }

  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Invalid amount");
  }
}
