"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import Footer from "@/components/Footer/Footer";
import HeroSection from "@/components/Landing/HeroSection";
import KeyFeatures from "@/components/Landing/KeyFeatures";
import Pricing from "@/components/Landing/Pricing";
import WaletooLogo from "@/components/Logo/WaletooLogo";
import { TracingBeam } from "@/components/TracingBeam";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { AppRoutes } from "@/router/app_routes";
import { CurrencyDollarIcon, InformationCircleIcon, WalletIcon } from "@heroicons/react/16/solid";

export default function Landing() {
  const t = useTranslations("Landing.Navigation");

  return (
    <TracingBeam className="w-full">
      <div className="flex flex-col">
        <div className="relative flex w-full flex-col items-center justify-center py-4 lg:flex-row">
          <div className="border-foreground left-4 border-b-2 lg:absolute lg:border-0">
            <WaletooLogo />
          </div>

          <NavigationMenu className="z-10">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <InformationCircleIcon className="mr-2 h-4 w-4" />
                    {t("about")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="#pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <CurrencyDollarIcon className="mr-2 h-4 w-4" />
                    {t("pricing")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href={AppRoutes.DASHBOARD} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <WalletIcon className="mr-2 h-4 w-4" />
                    {t("myWallet")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <main className="px-6">
          <HeroSection />
          <KeyFeatures />
          <Pricing />
        </main>

        <Footer />
      </div>
    </TracingBeam>
  );
}
