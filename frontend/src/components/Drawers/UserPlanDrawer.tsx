"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { User } from "@/utils/interfaces/user";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";

const UserPlanDrawer = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full lg:w-fit" variant="secondary">
          My plan
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-background dark:bg-customBlack-500">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-customBlack-500 dark:text-customWhite-300">Current user plan</DrawerTitle>
            <DrawerDescription className="text-customBlack-500 dark:text-customWhite-300" asChild>
              {!user?.isSubscribed ? (
                <p className="my-6 flex items-center justify-start gap-3 text-base">
                  <CheckCircleIcon className="h-5 w-5 text-yellow-500" /> Pro plan
                </p>
              ) : (
                <p className="my-6 flex items-center justify-start gap-3 text-base">
                  <XCircleIcon className="h-5 w-5 text-red-500" /> Free plan
                </p>
              )}
            </DrawerDescription>
          </DrawerHeader>

          <div>
            {user?.isSubscribed ? (
              <div>
                <div className="mb-4 flex items-center justify-between font-semibold">
                  <p className="flex items-center rounded-full bg-customBlack-300 px-2 py-1 text-xs font-semibold text-white dark:bg-customWhite-300 dark:text-customBlack-800">
                    <ClockIcon className="mr-1 h-3 w-3" /> TODO Days Left
                  </p>

                  <p className="text-xs">$2.99 / month</p>
                </div>

                <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-gray-300 bg-gray-200">
                  <div className="w-[50%] bg-green-500 py-1 text-xs leading-none" />
                </div>

                <p className="mt-4 text-xs text-gray-400">Automatic renewal on 03/22/2023</p>
              </div>
            ) : (
              <>
                <h4 className="mb-4">Why choose WhereDoISpend&apos;s Pro plan?</h4>

                <ul className="mb-7 list-inside list-decimal space-y-2 text-xs">
                  <li>Advanced financial comparisons with industry standards</li>
                  <li>Personalized financial alerts for issues like debt overload</li>
                  <li>Recommendations for optimizing your budget</li>
                </ul>
              </>
            )}

            <Button className="w-full" variant="default">
              {user?.isSubscribed ? "Change plan" : "Subscribe"}
            </Button>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserPlanDrawer;
