"use client";

import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading";
import ProtectedSidebar from "@/components/ProtectedSidebar";
import { useGetUser } from "@/hooks/mutations/user/useGetUser";
import { AppRoutes } from "@/router/app_routes";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: userResponse, isLoading } = useGetUser();
  const user = userResponse?.data?.user;

  useEffect(() => {
    if (!isLoading && !user) router.push(AppRoutes.AUTH);
  }, [user, isLoading, router]);

  if (isLoading) return <Loading />;
  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <ProtectedSidebar>
        <div className="flex h-full flex-col px-6">
          {children}

          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </ProtectedSidebar>
    </div>
  );
};

export default AuthLayout;
