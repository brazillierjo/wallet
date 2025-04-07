import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { AppRoutes } from "@/router/app_routes";

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard"];

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Combine the next-intl middleware with our custom middleware
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // First, handle authentication for protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    // Check for tokens in cookies
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    // If no tokens are found, redirect to auth page
    if (!accessToken || !refreshToken) {
      console.log("No tokens found, redirecting to auth page");
      const loginUrl = new URL(AppRoutes.AUTH, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Optional: You could also validate the token here by making a request to your API
    // This would require an additional API call, so it's a trade-off between security and performance
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
