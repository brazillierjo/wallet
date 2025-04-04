export interface User {
  id: string;
  name: string;
  email: string;
  isSubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string | null;
}
