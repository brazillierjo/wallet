import { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Providers } from "@/app/providers";
import { cn } from "@/tools/cn";

import "../styles/globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

const appFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WhereDoISpend | Simplified Financial Management",
  description: "Manage your monthly budget with ease.",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(appFont.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
