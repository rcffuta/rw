// import { AUTH_KEY } from "@gamezone/auth/token";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // const token = req.cookies.get(AUTH_KEY)?.value;

  // const isLoggedIn = !!token;
  // const isLoginPage = req.nextUrl.pathname.startsWith('/signin');

  // if (!isLoggedIn && !isLoginPage) {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/dashboard/:path*', '/admin/:path*'], // or whatever you protect
// };