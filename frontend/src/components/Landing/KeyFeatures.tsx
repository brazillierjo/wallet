import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import ImageHeroSection from "@/assets/png/landing_hero_section.png";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

const KeyFeatures = () => {
  const t = useTranslations("Landing.KeyFeatures");

  return (
    <section id="about" className="relative w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg px-3 py-1 text-sm">{t("title")}</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("heading")}</h2>

          <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">{t("description")}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <div className="grid gap-1">
            <h3 className="text-xl font-bold">{t("feature1.title")}</h3>
            <p className="text-muted-foreground">{t("feature1.description")}</p>
          </div>

          <div className="grid gap-1">
            <h3 className="text-xl font-bold">{t("feature2.title")}</h3>
            <p className="text-muted-foreground">{t("feature2.description")}</p>
          </div>

          <div className="grid gap-1">
            <h3 className="text-xl font-bold">{t("feature3.title")}</h3>
            <p className="text-muted-foreground">{t("feature3.description")}</p>
          </div>
        </div>

        <Image
          src={ImageHeroSection}
          width="550"
          height="310"
          alt="Features"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        />
      </div>

      <Link
        href="#pricing"
        className="absolute bottom-4 left-1/2 right-auto -translate-x-1/2 -translate-y-1/2 lg:left-auto lg:right-4 lg:block"
      >
        <ArrowDownCircleIcon className="h-6 w-6 animate-bounce hover:opacity-100 lg:opacity-70" />
      </Link>
    </section>
  );
};

export default KeyFeatures;
