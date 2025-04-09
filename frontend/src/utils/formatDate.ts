interface UseFormattedDateProps {
  locale: string;
  date: Date | string;
  options?: Intl.DateTimeFormatOptions;
}

export function formatDate({ locale, date, options }: UseFormattedDateProps): string {
  return new Intl.DateTimeFormat(locale, { ...options, hour12: locale !== "fr-FR" }).format(new Date(date));
}
