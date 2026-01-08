import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type MiddlewareFn = (
  req: NextRequest,
  context?: unknown
) => NextResponse | null | Promise<NextResponse | null>;

export function chainMiddlewares(...middlewares: MiddlewareFn[]) {
  return async (req: NextRequest, context?: unknown) => {
    for (const middleware of middlewares) {
      const response = await middleware(req, context);
      if (response) {
        return response;
      }
    }
    return null;
  };
}
