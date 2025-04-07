"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useLogin } from "@/hooks/mutations/auth/useLogin";
import { AppRoutes } from "@/router/app_routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Login = () => {
  const router = useRouter();
  const t = useTranslations("AuthPage");
  const tToast = useTranslations("Toast");
  const tValidation = useTranslations("Validation");

  const loginSchema = z.object({
    email: z.string().email(tValidation("invalidEmail")),
    password: z.string().min(8, tValidation("passwordMin")),
  });

  type LoginForm = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    try {
      await loginMutation.mutateAsync(formData, {
        onSuccess: (res) => {
          console.log("Login response:", res);

          if (res.status === "Unauthorized" && res.message === "Invalid credentials") {
            toast.error(tToast("invalidCredentials"), {
              description: tToast("checkCredentials"),
            });
          } else {
            router.push(AppRoutes.DASHBOARD);
          }
        },
        onError: (error) => {
          console.error("Login error:", error);
          toast.error(tToast("loginError"), {
            description: tToast("tryAgain"),
          });
        },
      });
    } catch (error) {
      console.error("Login exception:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-center text-xl font-bold text-gray-900">{t("title")}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <div>
            <input
              type="email"
              placeholder={t("email")}
              {...register("email")}
              className="block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder={t("password")}
              {...register("password")}
              className="block w-full rounded-lg border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 p-3 text-white transition-all duration-300 hover:bg-blue-600"
          >
            {t("login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
