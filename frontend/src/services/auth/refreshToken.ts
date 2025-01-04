import { ApiRoutes } from "@/router/api_routes";
import { fetchAPI } from "@/utils/fetchApi";

export interface RefreshTokenResponse {
  accessToken: string;
}

export const refreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  return await fetchAPI<RefreshTokenResponse>(ApiRoutes.AUTH_REFRESH, {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
};
