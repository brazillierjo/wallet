export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string | null;
  isSubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
