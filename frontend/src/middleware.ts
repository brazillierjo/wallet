import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { AppRoutes } from "@/router/app_routes";

const protectedRoutes = ["/dashboard"];

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Combine the next-intl middleware with our custom middleware
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // First, handle authentication for protected routes
  if (protectedRoutes.includes(pathname)) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    if (!accessToken && !refreshToken) {
      const loginUrl = new URL(AppRoutes.AUTH, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Then, apply the next-intl middleware
  const response = await intlMiddleware(request);

  // Add security headers to the response
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
