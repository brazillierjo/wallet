export interface Operation {
  id: string;
  label: string;
  amount: number;
  category?: string;
  dueDay?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type OperationInput = Omit<Operation, "id" | "createdAt" | "updatedAt">;
