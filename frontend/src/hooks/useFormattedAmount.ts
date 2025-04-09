"use client";

import { getCurrencyFromLocale } from "@/utils/getCurrencyFromLocale";

interface UseFormattedAmountProps {
  locale: string;
  amount: number;
}

export function useFormattedAmount({ locale, amount }: UseFormattedAmountProps): string {
  const currency = getCurrencyFromLocale(locale);

  // Check if the amount is a whole number
  const isWholeNumber = Math.floor(amount) === amount;

  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: isWholeNumber ? 0 : 2,
    minimumFractionDigits: isWholeNumber ? 0 : 2,
  }).format(amount);

  return formattedAmount;
}
