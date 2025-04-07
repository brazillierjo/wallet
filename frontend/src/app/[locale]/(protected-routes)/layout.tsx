"use client";

import { FC, ReactNode } from "react";

import Footer from "@/components/Footer/Footer";
import ProtectedSidebar from "@/components/ProtectedSidebar";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <ProtectedSidebar>
        <div className="flex min-h-[calc(100vh-4rem)] flex-col px-6">
          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </ProtectedSidebar>
    </div>
  );
};

export default AuthLayout;
