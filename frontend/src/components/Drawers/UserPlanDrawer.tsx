"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
import { useGetUser } from "@/hooks/mutations/user/useGetUser";
import { User } from "@/utils/interfaces/user";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface UserPlanDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserPlanDrawer = ({ isOpen, setIsOpen }: UserPlanDrawerProps) => {
  const t = useTranslations("UserPlanDrawer");
  const { data: userResponse } = useGetUser();
  const user = userResponse?.data?.user;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="bg-background">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t("title")}</DrawerTitle>
            <DrawerDescription asChild>
              {!user?.isSubscribed ? (
                <p className="my-6 flex items-center justify-start gap-3 text-base">
                  <CheckCircleIcon className="h-5 w-5 text-yellow-500" /> {t("proPlan")}
                </p>
              ) : (
                <p className="my-6 flex items-center justify-start gap-3 text-base">
                  <XCircleIcon className="h-5 w-5 text-red-500" /> {t("freePlan")}
                </p>
              )}
            </DrawerDescription>
          </DrawerHeader>

          <div>
            {user?.isSubscribed ? (
              <div>
                <div className="mb-4 flex items-center justify-between font-semibold">
                  <p className="flex items-center rounded-full px-2 py-1 text-xs font-semibold">
                    <ClockIcon className="mr-1 h-3 w-3" /> {t("daysLeft")}
                  </p>

                  <p className="text-xs">{t("perMonth")}</p>
                </div>

                <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-gray-300 bg-gray-200">
                  <div className="w-[50%] bg-green-500 py-1 text-xs leading-none" />
                </div>

                <p className="mt-4 text-xs text-gray-400">{t("automaticRenewal")}</p>
              </div>
            ) : (
              <>
                <h4 className="mb-4">{t("whyChoosePro")}</h4>

                <ul className="mb-7 list-inside list-decimal space-y-2 text-xs">
                  <li>{t("proFeatures.comparisons")}</li>
                  <li>{t("proFeatures.alerts")}</li>
                  <li>{t("proFeatures.recommendations")}</li>
                </ul>
              </>
            )}

            <Button className="w-full">{user?.isSubscribed ? t("changePlan") : t("subscribe")}</Button>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                {t("close")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserPlanDrawer;
