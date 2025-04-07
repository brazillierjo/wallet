"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import ImageHeroSection from "@/assets/png/landing_hero_section.png";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/mutations/user/useGetUser";
import { AppRoutes } from "@/router/app_routes";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { data: userResponse, isLoading } = useGetUser();
  const user = userResponse?.data?.user;

  const t = useTranslations("AuthPage");

  useEffect(() => {
    if (!isLoading && user) {
      // If user is already authenticated, redirect to dashboard
      router.push(AppRoutes.DASHBOARD);
    }
  }, [user, isLoading, router]);

  return (
    <main className="min-h-screen">
      <Link href={AppRoutes.LANDING}>
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeftCircleIcon className="h-6 w-6" /> {t("back")}
        </Button>
      </Link>

      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center lg:flex-row lg:justify-evenly">
        <Image src={ImageHeroSection} alt="Hero" className="hidden w-1/3 rounded-xl object-cover lg:block" />

        <div>
          <h3 className="mb-10 text-4xl font-bold">
            {isLogin ? (
              <p>
                <span className="text-blue-500">{t("signIn")}</span> {t("toContinue")}
              </p>
            ) : (
              <p>
                <span className="text-blue-500">{t("signUp")}</span> {t("toContinue")}
              </p>
            )}
          </h3>

          {isLogin ? <Login /> : <Register />}

          <button className="mt-4 text-sm text-blue-500 underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Auth;
