import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  localePrefix: "always",
  locales: ["en", "zh"],
  defaultLocale: "en"
});
