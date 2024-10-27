import UserInfoDrawer from "@/components/Drawers/UserInfoDrawer";
import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WalletooLogo from "@/components/ui/Logo/WalletooLogo";
import { User } from "@/utils/interfaces/user";
import { Bars2Icon } from "@heroicons/react/16/solid";

const ProtectedHeaderMobile = ({ user }: { user: User }) => {
  if (!user) return null;

  return (
    <div className="flex w-full justify-between bg-customWhite-500 px-4 py-2 dark:bg-customBlack-500">
      <WalletooLogo />

      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProtectedHeaderMobile;
