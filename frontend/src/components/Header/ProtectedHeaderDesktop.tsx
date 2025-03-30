"use client";

import UserInfoDrawer from "@/components/Drawers/UserInfoDrawer";
import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import WhereDoISpendLogo from "@/components/ui/Logo/WhereDoISpendLogo";
import LogoutButton from "@/components/ui/LogoutButton";
import { useGetUser } from "@/hooks/mutations/user/useGetUser";

const ProtectedHeaderDesktop = () => {
  const { data, isLoading, error } = useGetUser();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data?.data.user) return <div>Error: {error?.message}</div>;

  return (
    <div className="flex w-full justify-between bg-customWhite-500 px-4 py-2 dark:bg-customBlack-500">
      <WhereDoISpendLogo />

      <div className="flex items-center gap-6">
        <UserInfoDrawer user={data.data.user} />
        <UserPlanDrawer user={data.data.user} />

        <LogoutButton />
      </div>
    </div>
  );
};

export default ProtectedHeaderDesktop;
