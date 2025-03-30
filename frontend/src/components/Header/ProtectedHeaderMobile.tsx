"use client";

import UserInfoDrawer from "@/components/Drawers/UserInfoDrawer";
import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WhereDoISpendLogo from "@/components/ui/Logo/WhereDoISpendLogo";
import LogoutButtonMobile from "@/components/ui/LogoutButtonMobile";
import { useGetUser } from "@/hooks/mutations/user/useGetUser";
import { Bars2Icon } from "@heroicons/react/16/solid";

const ProtectedHeaderMobile = () => {
  const { data, isLoading, error } = useGetUser();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data?.data.user) return <div>Error: {error?.message}</div>;

  return (
    <div className="flex w-full justify-between bg-customWhite-500 px-4 py-2 dark:bg-customBlack-500">
      <WhereDoISpendLogo />

      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer" size="icon">
              <Bars2Icon className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="flex w-52 origin-top-right flex-col gap-2 rounded-xl bg-white p-1 text-sm/6 text-white dark:bg-customBlack-800"
          >
            <DropdownMenuItem asChild>
              <UserInfoDrawer user={data.data.user} />
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <UserPlanDrawer user={data.data.user} />
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <LogoutButtonMobile />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProtectedHeaderMobile;
