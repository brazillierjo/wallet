export interface Operation {
  id: number;
  label: string;
  amount: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OperationInput = Omit<Operation, "id" | "createdAt" | "updatedAt">;
