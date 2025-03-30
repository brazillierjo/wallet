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
import { Bars2Icon } from "@heroicons/react/16/solid";

import LogoutButtonMobile from "../ui/LogoutButtonMobile";

const ProtectedHeaderMobile = () => {
  const user = {
    id: 0,
    email: "test@test.com",
    name: "test name",
    avatar: "",
    isSubscribed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    expenses: [],
    incomes: [],
  };

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
              <UserInfoDrawer user={user} />
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <UserPlanDrawer user={user} />
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
