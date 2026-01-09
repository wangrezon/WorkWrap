"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/types/intl";

export function IntlToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale: Locale = locale === "en" ? "zh" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9"
      onClick={toggleLocale}
    >
      <Globe className="size-4" />
    </Button>
  );
}
