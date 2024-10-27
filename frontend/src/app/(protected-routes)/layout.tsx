"use client";

import { FC, ReactNode, useEffect, useState } from "react";

import Footer from "@/components/Footer/Footer";
import ProtectedHeaderDesktop from "@/components/Header/ProtectedHeaderDesktop";
import ProtectedHeaderMobile from "@/components/Header/ProtectedHeaderMobile";
import Loading from "@/components/ui/Loading";
import { fetchUser } from "@/utils/api/user";
import { Breakpoints } from "@/utils/Breakpoints";
import { User } from "@/utils/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import { useWindowSize } from "usehooks-ts";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { width } = useWindowSize();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const [isMobile, setIsMobile] = useState(width < Breakpoints.md);

  useEffect(() => {
    if (width < Breakpoints.md) setIsMobile(true);
    if (width >= Breakpoints.md) setIsMobile(false);
  }, [width]);

  if (isLoading) return <Loading isFullScreen />;

  if (error || !user) return null;

  return (
    <div className="flex min-h-screen w-full flex-col">
      {isMobile ? <ProtectedHeaderMobile user={user} /> : <ProtectedHeaderDesktop user={user} />}
      <div className="flex-grow overflow-x-auto bg-customWhite-800 dark:bg-customBlack-800">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
