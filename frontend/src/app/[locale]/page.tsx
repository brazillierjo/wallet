"use client";

import { useTranslations } from "next-intl";

import { FloatingDock } from "@/components/FloatingDock";
import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/Landing/HeroSection";
import KeyFeatures from "@/components/Landing/KeyFeatures";
import Pricing from "@/components/Landing/Pricing";
import WaletooLogo from "@/components/Logo/WaletooLogo";
import { TracingBeam } from "@/components/TracingBeam";
import { AppRoutes } from "@/router/app_routes";
import { ArrowRightIcon, CurrencyDollarIcon, InformationCircleIcon } from "@heroicons/react/16/solid";

export default function Landing() {
  const t = useTranslations("Landing.Navigation");

  return (
    <TracingBeam className="w-full">
      <div className="flex flex-col">
        <FloatingDock
          desktopClassName="fixed left-1/2 -translate-x-1/2 bottom-4"
          mobileClassName="fixed bottom-4 right-4"
          items={[
            { href: "#about", title: t("about"), icon: <InformationCircleIcon /> },
            { href: "#pricing", title: t("pricing"), icon: <CurrencyDollarIcon /> },
            {
              href: AppRoutes.DASHBOARD,
              title: t("myWallet"),
              icon: <ArrowRightIcon />,
            },
          ]}
        />

        <main className="px-6">
          <div className="absolute left-1/2 top-2 -translate-x-1/2 lg:left-4 lg:top-4 lg:translate-x-0">
            <WaletooLogo />
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
