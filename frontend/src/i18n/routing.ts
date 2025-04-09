import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "en-GB", "fr-FR", "ja-JP", "de-DE"],
  defaultLocale: "en-US",
});
