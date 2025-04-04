"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UserInfoDrawer from "@/components/Drawers/UserInfoDrawer";
import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import WaletooLogo from "@/components/ui/Logo/WaletooLogo";
import LogoutButton from "@/components/ui/LogoutButton";
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
import { useGetUser } from "@/hooks/mutations/user/useGetUser";
import { cn } from "@/lib/utils";
import { AppRoutes } from "@/router/app_routes";
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
                  pathname === AppRoutes.DASHBOARD ? "bg-accent" : "transparent"
                )}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
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
                <span>Account</span>
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
                <span>My plan</span>
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

  if (!user) return null;

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-full w-full">
        <SidebarContentWrapper setDrawerPlanOpen={setDrawerPlanOpen} setDrawerUserInfoOpen={setDrawerUserInfoOpen} />

        <div className="flex-1">
          <div className="flex h-16 items-center border-b px-4">
            <SidebarTrigger />
          </div>
          <main className="p-4">{children}</main>
        </div>
      </div>

      <UserInfoDrawer isOpen={drawerUserInfoOpen} setIsOpen={setDrawerUserInfoOpen} />
      <UserPlanDrawer isOpen={drawerPlanOpen} setIsOpen={setDrawerPlanOpen} />
    </SidebarProvider>
  );
};

export default ProtectedSidebar;
