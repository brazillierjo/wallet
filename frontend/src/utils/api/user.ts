import { ApiRoutes } from "@/router/api_routes";

export const fetchUser = async () => {
  const response = await fetch(ApiRoutes.USER, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

export const deleteUser = async (): Promise<void> => {
  const response = await fetch(ApiRoutes.USER, { method: "DELETE", credentials: "include" });

  if (!response.ok) {
    throw new Error("Failed to delete user data");
  }

  await response.json();
};
