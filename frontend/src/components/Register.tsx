"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useRegister } from "@/hooks/mutations/auth/useRegister";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";
import { AppRoutes } from "@/router/app_routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Register = () => {
  const router = useRouter();
  const t = useTranslations("AuthPage");
  const tValidation = useTranslations("Validation");
  const tToast = useTranslations("Toast");

  // Définir le schéma à l'intérieur du composant pour accéder aux traductions
  const registerSchema = z
    .object({
      name: z.string().min(1, tValidation("nameRequired")),
      email: z.string().email(tValidation("invalidEmail")),
      password: z.string().min(8, tValidation("passwordMin")),
      confirmPassword: z.string().min(8, tValidation("passwordConfirmRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: tValidation("passwordsMustMatch"),
    });

  type RegisterForm = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit: SubmitHandler<RegisterForm> = (formData) => {
    const { name, email, password } = formData;

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          reset();
          toast.success(tToast("registrationSuccess"));
          router.push(AppRoutes.DASHBOARD);
        },
        onError: (error: Error) => {
          console.error(error);
          toast.error(tToast("registrationError"), {
            description: tToast("tryAgain"),
          });
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-center text-xl font-bold text-gray-900">Create an Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="block w-full rounded-lg border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="block w-full rounded-lg border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="block w-full rounded-lg border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="block w-full rounded-lg border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg bg-blue-500 p-3 font-semibold text-white shadow transition hover:bg-blue-600 ${
              registerMutation.isPending ? "opacity-50" : ""
            }`}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
