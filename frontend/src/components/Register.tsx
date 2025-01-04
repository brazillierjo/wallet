"use client";

import { useRouter } from "next/navigation";

import { useRegister } from "@/hooks/mutations/auth/useRegister";
import { AppRoutes } from "@/router/app_routes";
import { SubmitHandler, useForm } from "react-hook-form";

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

const Register = () => {
  const { register: formRegister, handleSubmit, reset } = useForm<RegisterForm>();
  const router = useRouter();
  const registerMutation = useRegister();

  const onSubmit: SubmitHandler<RegisterForm> = (formData) => {
    registerMutation.mutate(formData, {
      onSuccess: () => {
        reset();
        router.push(AppRoutes.DASHBOARD);
      },
      onError: (error: Error) => {
        console.error(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        {...formRegister("name", { required: true })}
        className="block w-full rounded border p-2"
      />
      <input
        type="email"
        placeholder="Email"
        {...formRegister("email", { required: true })}
        className="block w-full rounded border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        {...formRegister("password", { required: true })}
        className="block w-full rounded border p-2"
      />
      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 text-white transition hover:bg-blue-600"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Register;
