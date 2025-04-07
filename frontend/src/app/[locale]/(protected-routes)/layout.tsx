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
