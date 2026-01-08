import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import type { NextRequest } from "next/server";
import type { MiddlewareFn } from "./chain";

export function createI18nMiddleware(): MiddlewareFn {
  const intlMiddleware = createMiddleware(routing);

  return (req: NextRequest) => {
    return intlMiddleware(req);
  };
}
