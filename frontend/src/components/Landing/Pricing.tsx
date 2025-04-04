"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/router/app_routes";
import { cn } from "@/tools/cn";
import { Switch } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Pricing = () => {
  const [yearlyPrice, setYearlyPrice] = useState(false);

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg px-3 py-1 text-sm">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Affordable plans for everyone</h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Waletoo offers flexible pricing plans to fit your needs and budget. Start your journey to financial
              freedom today.
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          <span className={cn(!yearlyPrice ? "text-blue-500" : "")}>Monthly</span>
          <Switch
            checked={yearlyPrice}
            onChange={setYearlyPrice}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200",
              yearlyPrice ? "bg-blue-500" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition dark:bg-customBlack-300",
                yearlyPrice ? "translate-x-6" : "translate-x-1"
              )}
            />
          </Switch>
          <span className={cn(yearlyPrice ? "text-blue-500" : "")}>Yearly</span>
        </div>

        <div className="mx-auto grid max-w-2xl items-center gap-6 pb-12 pt-4 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
            <div>
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="text-4xl font-bold">$0</p>
              <p className="text-muted-foreground">{yearlyPrice ? "per year" : "per month"}</p>
            </div>

            <ul className="grid gap-2">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Custom financial charts
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Financial insights
              </li>
              <li>
                <XMarkIcon className="mr-2 inline-block h-4 w-4" />
                Advanced financial comparisons
              </li>
              <li>
                <XMarkIcon className="mr-2 inline-block h-4 w-4" />
                Personalized financial alerts
              </li>
              <li>
                <XMarkIcon className="mr-2 inline-block h-4 w-4" />
                Recommendations for optimizing your budget
              </li>
            </ul>

            <Link
              href={AppRoutes.AUTH}
              className="inline-flex h-10 items-center justify-center rounded-md border-white px-8 text-sm font-medium shadow transition-all duration-150 hover:shadow-lg dark:border"
            >
              Sign Up
            </Link>
          </div>

          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
            <div>
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="text-4xl font-bold">{yearlyPrice ? "$29.99" : "$2.99"}</p>
              <p className="80">{yearlyPrice ? "per year" : "per month"}</p>
            </div>

            <ul className="grid gap-2">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Custom financial charts
              </li>

              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Advanced financial insights
              </li>

              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Advanced financial comparisons
              </li>

              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Personalized financial alerts
              </li>

              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Recommendations for optimizing your budget
              </li>
            </ul>

            <Link href={AppRoutes.AUTH}>
              <Button variant="default" className="w-full">
                Go premium !
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
