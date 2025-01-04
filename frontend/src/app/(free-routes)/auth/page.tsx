"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ImageHeroSection from "@/assets/png/landing_hero_section.png";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { AppRoutes } from "@/router/app_routes";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen">
      <Link href={AppRoutes.LANDING}>
        <button className="flex items-center gap-2 rounded p-2 transition-all duration-300 hover:bg-customWhite-300 dark:hover:bg-customBlack-300">
          <ArrowLeftCircleIcon className="h-6 w-6" /> Back
        </button>
      </Link>

      <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center lg:flex-row lg:justify-evenly">
        <Image src={ImageHeroSection} alt="Hero" className="hidden w-1/3 rounded-xl object-cover lg:block" />

        <div>
          <h3 className="mb-10 text-4xl font-bold">
            {isLogin ? (
              <p>
                <span className="text-blue-500">Sign in</span> to continue
              </p>
            ) : (
              <p>
                <span className="text-blue-500">Sign up</span> to continue
              </p>
            )}
          </h3>

          {isLogin ? <Login /> : <Register />}

          <button className="mt-4 text-sm text-blue-500 underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Auth;
