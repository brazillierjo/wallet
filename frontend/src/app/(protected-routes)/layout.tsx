import { FC, ReactNode } from "react";

import Footer from "@/components/Footer/Footer";
import ProtectedHeaderDesktop from "@/components/Header/ProtectedHeaderDesktop";
import ProtectedHeaderMobile from "@/components/Header/ProtectedHeaderMobile";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Header mobile */}
      <div className="md:hidden">
        <ProtectedHeaderMobile />
      </div>

      {/* Header desktop */}
      <div className="hidden md:block">
        <ProtectedHeaderDesktop />
      </div>

      <div className="flex-grow overflow-x-auto bg-customWhite-800 dark:bg-customBlack-800">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
