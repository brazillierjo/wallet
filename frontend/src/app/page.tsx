"use client";

import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/Landing/HeroSection";
import KeyFeatures from "@/components/Landing/KeyFeatures";
import Pricing from "@/components/Landing/Pricing";
import { FloatingDock } from "@/components/ui/FloatingDock";
import WalletooLogo from "@/components/ui/Logo/WalletooLogo";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { AppRoutes } from "@/router/app_routes";
import { ArrowRightIcon, CurrencyDollarIcon, InformationCircleIcon } from "@heroicons/react/16/solid";
import { useSession } from "next-auth/react";

export default function Landing() {
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  return (
    <TracingBeam className="w-full">
      <div className="flex flex-col">
        <FloatingDock
          desktopClassName="fixed left-1/2 -translate-x-1/2 bottom-4"
          mobileClassName="fixed bottom-4 right-4"
          items={[
            { href: "#about", title: "About", icon: <InformationCircleIcon /> },
            { href: "#pricing", title: "Pricing", icon: <CurrencyDollarIcon /> },
            {
              href: AppRoutes.AUTH,
              title: isAuthenticated ? "My Wallet" : "Get Started",
              icon: <ArrowRightIcon />,
            },
          ]}
        />

        <main className="px-6">
          <div className="absolute left-1/2 top-2 -translate-x-1/2 lg:left-4 lg:top-4 lg:translate-x-0">
            <WalletooLogo />
          </div>
          <HeroSection />
          <KeyFeatures />
          <Pricing />
        </main>

        <Footer />
      </div>
    </TracingBeam>
  );
}
