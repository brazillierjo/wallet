const currencyMap: Record<string, string> = {
  "en-US": "USD",
  "en-GB": "GBP",
  "fr-FR": "EUR",
  "ja-JP": "JPY",
  "de-DE": "EUR",
};

export function getCurrencyFromLocale(locale: string): string {
  return currencyMap[locale] ?? "USD";
}
