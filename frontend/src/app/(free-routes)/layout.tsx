import { ReactNode } from "react";

import Footer from "@/components/Footer/Footer";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-customWhite-800 p-6 dark:bg-customBlack-800">
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
