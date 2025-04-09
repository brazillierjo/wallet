"use client";

import { getCurrencyFromLocale } from "@/utils/getCurrencyFromLocale";

interface UseFormattedAmountProps {
  locale: string;
  amount: number;
}

export function useFormattedAmount({ locale, amount }: UseFormattedAmountProps): string {
  const currency = getCurrencyFromLocale(locale);

  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);

  return formattedAmount;
}
