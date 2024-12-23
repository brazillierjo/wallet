import { FC, ReactNode, type JSX } from "react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Walletoo - Authentification",
  description:
    "Securely log in or register to access exclusive features on Walletoo. Our easy-to-use authentication ensures your data is protected. Join us today!",
};

type Props = {
  children: ReactNode;
};

const AuthLayout: FC<Props> = async ({ children }: Props) => {
  return children as JSX.Element;
};

export default AuthLayout;
