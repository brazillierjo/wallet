import { NextResponse } from "next/server";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";

export { default } from "next-auth/middleware";

export async function middleware(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL("", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/api/:path*"],
};
