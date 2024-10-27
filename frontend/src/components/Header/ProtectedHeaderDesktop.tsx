import UserInfoDrawer from "@/components/Drawers/UserInfoDrawer";
import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import WalletooLogo from "@/components/ui/Logo/WalletooLogo";
import LogoutButton from "@/components/ui/LogoutButton";
import { User } from "@/utils/interfaces/user";

const ProtectedHeaderDesktop = ({ user }: { user: User }) => {
  if (!user) return null;

  return (
    <div className="flex w-full justify-between bg-customWhite-500 px-4 py-2 dark:bg-customBlack-500">
      <WalletooLogo />

      <div className="flex items-center gap-6">
        <UserInfoDrawer user={user} />
        <UserPlanDrawer user={user} />

        <LogoutButton />
      </div>
    </div>
  );
};

export default ProtectedHeaderDesktop;
