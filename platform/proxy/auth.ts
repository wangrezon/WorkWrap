import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { MiddlewareFn } from "./chain";

export function createAuthMiddleware(): MiddlewareFn {
  return async (request: NextRequest) => {
    const session = await auth();

    const protectedPaths = ["/account"];
    const { pathname } = request.nextUrl;

    const isProtectedPath = protectedPaths.some((path) =>
      pathname.includes(path)
    );

    if (isProtectedPath && !session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return null;
  };
}
