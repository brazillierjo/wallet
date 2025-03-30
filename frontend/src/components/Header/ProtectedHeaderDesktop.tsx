import UserInfoDrawer from "@/components/Drawers/UserInfoDrawer";
import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import WhereDoISpendLogo from "@/components/ui/Logo/WhereDoISpendLogo";
import LogoutButton from "@/components/ui/LogoutButton";
import { useUser } from "@/hooks/useUser";

const ProtectedHeaderDesktop = () => {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return null;
  }

  return (
    <div className="flex w-full justify-between bg-customWhite-500 px-4 py-2 dark:bg-customBlack-500">
      <WhereDoISpendLogo />

      <div className="flex items-center gap-6">
        <UserInfoDrawer user={user} />
        <UserPlanDrawer user={user} />

        <LogoutButton />
      </div>
    </div>
  );
};

export default ProtectedHeaderDesktop;
