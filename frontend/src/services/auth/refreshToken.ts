import { ApiRoutes } from "@/router/api_routes";

export const refreshTokenMutation = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.AUTH_REFRESH}`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json();
};
