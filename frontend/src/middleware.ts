import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";
import { AppRoutes } from "@/router/app_routes";
import { isTokenValid } from "@/utils/auth";

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

// Combine the next-intl middleware with our custom middleware
export default async function middleware(request: NextRequest) {
  // Apply the next-intl middleware
  const response = await intlMiddleware(request);

  // Add security headers to the response
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Check if the user is authenticated by looking for the accessToken cookie
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = isTokenValid(accessToken);

  console.log("isAuthenticated", isAuthenticated);

  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;

  // Check if the path is a protected route
  const isProtectedRoute =
    pathname.includes("/dashboard") || pathname.includes("/profile") || pathname.includes("/settings");

  // Check if the path is an auth route
  const isAuthRoute = pathname.includes("/auth");

  // Redirect authenticated users away from auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL(AppRoutes.DASHBOARD, request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(AppRoutes.AUTH, request.url));
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
