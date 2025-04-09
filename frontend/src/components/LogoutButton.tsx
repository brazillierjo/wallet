"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/mutations/auth/useLogout";
import { AppRoutes } from "@/router/app_routes";
import { cn } from "@/utils/utils";
import { LogOutIcon } from "lucide-react";

interface LogoutButtonProps {
  variant?: "icon" | "full";
  className?: string;
}

const LogoutButton: FC<LogoutButtonProps> = ({ variant = "full", className }) => {
  const router = useRouter();
  const logoutMutation = useLogout();

  const t = useTranslations("Sidebar");

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
    <Button
      onClick={handleLogout}
      variant="ghost"
      className={cn(
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-start gap-2",
        variant === "icon" && "justify-center px-2",
        className
      )}
    >
      <LogOutIcon className="h-5 w-5" />
      {variant === "full" && <span>{t("logout")}</span>}
    </Button>
  );
};

export default LogoutButton;
