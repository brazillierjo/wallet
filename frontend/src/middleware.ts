import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AppRoutes } from "@/router/app_routes";

const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    if (!accessToken && !refreshToken) {
      const loginUrl = new URL(AppRoutes.AUTH, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/dashboard"],
};
