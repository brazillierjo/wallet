import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import ImageHeroSection from "@/assets/png/landing_hero_section.png";
import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/router/app_routes";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

const HeroSection = () => {
  const t = useTranslations("Landing.HeroSection");

  return (
    <section className="relative flex w-full flex-col gap-6 px-4 py-20 md:px-6 md:py-24 lg:h-screen lg:flex-row lg:py-32">
      <div className="flex flex-col justify-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{t("title")}</h1>

          <p className="mt-4 max-w-[600px] md:text-xl">{t("subtitle")}</p>

          <p className="mt-4">{t("disclaimer")}</p>
        </div>

        <Button asChild className="mx-auto w-fit lg:mx-0">
          <Link href={AppRoutes.AUTH}>{t("getStarted")}</Link>
        </Button>
      </div>

      <div className="my-auto">
        <Image src={ImageHeroSection} alt="Hero" className="hidden rounded-xl object-cover lg:block" />
      </div>

      <Link
        href="#about"
        className="absolute bottom-4 left-1/2 right-auto -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-4 lg:block"
      >
        <ArrowDownCircleIcon className="h-6 w-6 animate-bounce hover:opacity-100 lg:opacity-70" />
      </Link>
    </section>
  );
};

export default HeroSection;
