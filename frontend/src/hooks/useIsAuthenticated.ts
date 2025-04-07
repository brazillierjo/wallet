import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetUser } from "@/hooks/mutations/user/useGetUser";
import { AppRoutes } from "@/router/app_routes";

interface UseIsAuthenticatedOptions {
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

export const useIsAuthenticated = (options: UseIsAuthenticatedOptions = {}) => {
  const { redirectTo, redirectIfAuthenticated = false } = options;
  const router = useRouter();
  const { data: userResponse, isLoading } = useGetUser();
  const user = userResponse?.data?.user;
  const isAuthenticated = !!user;

  useEffect(() => {
    if (isLoading) return;

    // If user is authenticated and we want to redirect authenticated users away
    if (isAuthenticated && redirectIfAuthenticated) {
      router.push(redirectTo || AppRoutes.DASHBOARD);
      return;
    }

    // If user is not authenticated and we want to redirect unauthenticated users
    if (!isAuthenticated && !redirectIfAuthenticated) {
      router.push(redirectTo || AppRoutes.AUTH);
      return;
    }
  }, [isAuthenticated, isLoading, redirectIfAuthenticated, redirectTo, router]);

  return {
    isAuthenticated,
    isLoading,
    user,
  };
};
