"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = async (formData) => {
    try {
      await loginMutation.mutateAsync(formData, {
        onSuccess: (res) => {
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
    <div className="flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{t("title")}</CardTitle>
          <CardDescription className="text-center">{t("description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("emailPlaceholder")} type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("passwordPlaceholder")} type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? t("loggingIn") : t("login")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
