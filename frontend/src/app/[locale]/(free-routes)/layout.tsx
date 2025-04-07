import { ReactNode } from "react";

import Footer from "@/components/Footer/Footer";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen flex-col p-6">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
