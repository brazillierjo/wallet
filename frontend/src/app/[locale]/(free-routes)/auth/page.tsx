"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import ImageHeroSection from "@/assets/png/landing_hero_section.png";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link as ShadcnLink } from "@/components/ui/link";
import { AppRoutes } from "@/router/app_routes";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const t = useTranslations("AuthPage");

  return (
    <main>
      <Link href={AppRoutes.LANDING}>
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeftCircleIcon className="h-6 w-6" /> {t("back")}
        </Button>
      </Link>

      <div className="mt-10 flex flex-col items-center justify-center lg:flex-row lg:justify-evenly">
        <Image src={ImageHeroSection} alt="Hero" className="hidden w-1/3 rounded-xl object-cover lg:block" />

        <div>
          <Heading as="h3" size="lg" align="center" className="mb-10">
            {isLogin ? (
              <p>
                <span className="text-blue-500">{t("signIn")}</span> {t("toContinue")}
              </p>
            ) : (
              <p>
                <span className="text-blue-500">{t("signUp")}</span> {t("toContinue")}
              </p>
            )}
          </Heading>

          {isLogin ? <Login /> : <Register />}

          <div className="mt-4 text-center">
            <ShadcnLink
              href="#"
              variant="link"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}
            </ShadcnLink>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
