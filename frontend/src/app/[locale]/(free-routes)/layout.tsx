import { ReactNode } from "react";

import Footer from "@/components/Footer/Footer";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-background p-6">
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
