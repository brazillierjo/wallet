import Image from "next/image";
import Link from "next/link";

import ImageHeroSection from "@/assets/png/landing_hero_section.png";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

const KeyFeatures = () => {
  return (
    <section id="about" className="relative w-full px-4 py-12 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg px-3 py-1 text-sm">Key Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Take control of your personal finances with confidence
          </h2>

          <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Waletoo provides a comprehensive set of tools designed to give you full control over your personal finances.
            Benefit from personalized insights, expert financial advice, and smart tools to manage your money more
            effectively.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <div className="grid gap-1">
            <h3 className="text-xl font-bold">Tailored Financial Visualizations</h3>
            <p className="text-muted-foreground">
              Visualize your income and expenses with ease, and get a clear picture of your financial situation.
            </p>
          </div>

          <div className="grid gap-1">
            <h3 className="text-xl font-bold">Expert financial guidance (Premium)</h3>
            <p className="text-muted-foreground">
              Receive tailored advice and insights from top financial experts. Identify areas where you can save more
              and spend wisely.
            </p>
          </div>

          <div className="grid gap-1">
            <h3 className="text-xl font-bold">Personalized Advice</h3>
            <p className="text-muted-foreground">
              Get tailored financial advice based on your unique situation, goals, and spending habits.
            </p>
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
