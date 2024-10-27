import { Operation } from "./operation";

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string | null;
  isSubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
  expenses: Operation[];
  incomes: Operation[];
}
