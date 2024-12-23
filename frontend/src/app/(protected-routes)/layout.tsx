"use client";

import { FC, ReactNode, useEffect, useState } from "react";

import Footer from "@/components/Footer/Footer";
import ProtectedHeaderDesktop from "@/components/Header/ProtectedHeaderDesktop";
import ProtectedHeaderMobile from "@/components/Header/ProtectedHeaderMobile";
import useWindowSize from "@/hooks/useWindowSize";
import { Breakpoints } from "@/utils/Breakpoints";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState(width < Breakpoints.md);

  useEffect(() => {
    if (width < Breakpoints.md) setIsMobile(true);
    if (width >= Breakpoints.md) setIsMobile(false);
  }, [width]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      {isMobile ? <ProtectedHeaderMobile /> : <ProtectedHeaderDesktop />}

      <div className="flex-grow overflow-x-auto bg-customWhite-800 dark:bg-customBlack-800">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
