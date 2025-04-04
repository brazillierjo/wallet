"use client";

import { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="waletoo-theme"
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
