"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/mutations/auth/useLogout";
import { AppRoutes } from "@/router/app_routes";
import { cn } from "@/utils/utils";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  variant?: "icon" | "full";
  className?: string;
}

const LogoutButton: FC<LogoutButtonProps> = ({ variant = "full", className }) => {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate("", {
      onSuccess: () => {
        router.push(AppRoutes.LANDING);
      },
      onError: (error) => {
        console.error("Logout failed:", error.message);
      },
    });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className={cn(
        "flex w-full items-center justify-start gap-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        variant === "icon" && "justify-center px-2",
        className
      )}
    >
      <LogOut className="h-5 w-5" />
      {variant === "full" && <span>Logout</span>}
    </Button>
  );
};

export default LogoutButton;
