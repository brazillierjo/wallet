"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import UserInfoDrawer from "@/components/Drawers/UserInfoDrawer";
import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import WaletooLogo from "@/components/Logo/WaletooLogo";
import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useGetUser } from "@/hooks/mutations/user/useGetUser";
import { AppRoutes } from "@/router/app_routes";
import { cn } from "@/utils/utils";
import { LayoutDashboard, Receipt, User } from "lucide-react";

interface ProtectedSidebarProps {
  children: React.ReactNode;
}

type SidebarContentWrapperProps = {
  setDrawerPlanOpen: (open: boolean) => void;
  setDrawerUserInfoOpen: (open: boolean) => void;
};

const SidebarContentWrapper = ({ setDrawerPlanOpen, setDrawerUserInfoOpen }: SidebarContentWrapperProps) => {
  const pathname = usePathname();
  const { state } = useSidebar();
  const t = useTranslations("Sidebar");

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-4">
        <Link href={AppRoutes.DASHBOARD} className="flex items-center gap-2 font-semibold">
          <WaletooLogo />
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={AppRoutes.DASHBOARD}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:bg-accent",
                  pathname === AppRoutes.DASHBOARD ? "bg-secondary" : "transparent"
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>{t("dashboard")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => setDrawerUserInfoOpen(true)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent"
              >
                <User className="h-5 w-5" />
                <span>{t("account")}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={() => setDrawerPlanOpen(true)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent"
              >
                <Receipt className="h-5 w-5" />
                <span>{t("myPlan")}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-2">
          <LogoutButton variant={isCollapsed ? "icon" : "full"} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

const ProtectedSidebar: FC<ProtectedSidebarProps> = ({ children }) => {
  const [drawerPlanOpen, setDrawerPlanOpen] = useState(false);
  const [drawerUserInfoOpen, setDrawerUserInfoOpen] = useState(false);

  const { data: userResponse } = useGetUser();
  const user = userResponse?.data?.user;

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-full w-full">
        <SidebarContentWrapper setDrawerPlanOpen={setDrawerPlanOpen} setDrawerUserInfoOpen={setDrawerUserInfoOpen} />

        <div className="flex-1">
          <div className="flex h-16 items-center bg-card justify-between border-b px-4">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button onClick={() => setDrawerUserInfoOpen(true)} className="cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`} />
                  <AvatarFallback>{user?.name?.charAt(0) ?? "?"}</AvatarFallback>
                </Avatar>
              </button>
            </div>
          </div>

          <main className="h-full">{children}</main>
        </div>
      </div>

      <UserInfoDrawer isOpen={drawerUserInfoOpen} setIsOpen={setDrawerUserInfoOpen} />
      <UserPlanDrawer isOpen={drawerPlanOpen} setIsOpen={setDrawerPlanOpen} />
    </SidebarProvider>
  );
};

export default ProtectedSidebar;
