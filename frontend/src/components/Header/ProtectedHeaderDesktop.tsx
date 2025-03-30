"use client";

import UserInfoDrawer from "@/components/Drawers/UserInfoDrawer";
import UserPlanDrawer from "@/components/Drawers/UserPlanDrawer";
import WhereDoISpendLogo from "@/components/ui/Logo/WhereDoISpendLogo";
import LogoutButton from "@/components/ui/LogoutButton";
import { useGetUser } from "@/hooks/mutations/user/useGetUser";

const ProtectedHeaderDesktop = () => {
  const user2 = {
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

  const { data: user, isLoading, error } = useGetUser();
  console.log(user);

  return (
    <div className="flex w-full justify-between bg-customWhite-500 px-4 py-2 dark:bg-customBlack-500">
      <WhereDoISpendLogo />

      <div className="flex items-center gap-6">
        <UserInfoDrawer user={user2} />
        <UserPlanDrawer user={user2} />

        <LogoutButton />
      </div>
    </div>
  );
};

export default ProtectedHeaderDesktop;
