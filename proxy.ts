import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const PRIVATE_ROUTES = ["/notes", "/profile"];
const AUTH_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  let isAuthenticated = !!accessToken;

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession();

      if (session?.accessToken) {
        isAuthenticated = true;

        response.cookies.set("accessToken", session.accessToken, {
          httpOnly: true,
          path: "/",
        });

        if (session.refreshToken) {
          response.cookies.set("refreshToken", session.refreshToken, {
            httpOnly: true,
            path: "/",
          });
        }
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/notes/:path*", "/profile", "/login", "/register"],
};