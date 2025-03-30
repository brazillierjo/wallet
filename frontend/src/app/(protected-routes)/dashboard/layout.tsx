import { FC, ReactNode, type JSX } from "react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "WhereDoISpend - Mon dashboard",
  description:
    "Access your WhereDoISpend dashboard to view insights, manage your account, and stay updated. Easily navigate through your data and activities.",
};

type Props = {
  children: ReactNode;
};

const DashboardLayout: FC<Props> = async ({ children }: Props) => {
  return children as JSX.Element;
};

export default DashboardLayout;
