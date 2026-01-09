import type { NextRequest } from "next/server";
import {
  chainMiddlewares,
  createAuthMiddleware,
  createI18nMiddleware,
} from "./proxy/middleware";

export default async function proxy(req: NextRequest) {
  const middlewareChain = chainMiddlewares(
    createAuthMiddleware(),
    createI18nMiddleware()
  );

  const response = await middlewareChain(req);

  return response || new Response(null, { status: 200 });
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(zh|en)/:path*"],
};
