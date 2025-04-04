"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import { Button } from "@/components/ui/button";
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
import { useUser } from "@/hooks/queries/user/useUser";
import { cn } from "@/lib/utils";
import { AppRoutes } from "@/router/app_routes";
import { CreditCard, LayoutDashboard, LogOut } from "lucide-react";

interface ProtectedSidebarProps {
  children: React.ReactNode;
}

// Composant interne qui utilise useSidebar
const SidebarContentWrapper = () => {
  const pathname = usePathname();
  const { data: user } = useUser();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-4">
        <Link href={AppRoutes.DASHBOARD} className="flex items-center gap-2 font-semibold">
          <span className="text-xl">Wallet</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
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
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-2">
          {user && <UserPlanDrawer user={user} />}
          <LogoutButton variant={isCollapsed ? "icon" : "full"} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

const ProtectedSidebar: FC<ProtectedSidebarProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-full w-full">
        <SidebarContentWrapper />
        <div className="flex-1">
          <div className="flex h-16 items-center border-b px-4">
            <SidebarTrigger />
          </div>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedSidebar;
