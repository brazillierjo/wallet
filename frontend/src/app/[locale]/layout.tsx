import { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { Providers } from "@/app/[locale]/providers";
import { routing } from "@/i18n/routing";
import { cn } from "@/utils/cn";

import "../../styles/globals.css";

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

const appFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Waletoo | Simplified Financial Management",
  description: "Manage your monthly budget with ease.",
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(appFont.className)}>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
