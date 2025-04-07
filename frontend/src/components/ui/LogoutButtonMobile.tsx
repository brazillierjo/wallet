"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/mutations/auth/useLogout";
import { AppRoutes } from "@/router/app_routes";
import { LogOutIcon } from "lucide-react";

const LogoutButtonMobile: React.FC = () => {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push(AppRoutes.LANDING);
      },
      onError: (error) => {
        console.error("Logout failed:", error.message);
      },
    });
  };

  return (
    <Button variant="default" className="w-full" onClick={handleLogout}>
      Se déconnecter
      <LogOutIcon className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default LogoutButtonMobile;
