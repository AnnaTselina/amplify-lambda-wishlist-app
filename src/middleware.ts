import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
import { ROUTES } from "./utils/constants";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});

        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  if (!authenticated) {
    if (request.nextUrl.pathname === ROUTES.home) {
      return response;
    } else {
      return NextResponse.redirect(new URL(ROUTES.home, request.url));
    }
  } else {
    if (request.nextUrl.pathname === ROUTES.home) {
      return NextResponse.redirect(new URL(ROUTES.wishlists, request.url));
    } else {
      return response;
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * /sign-in-redirect route
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in-redirect).*)",
  ],
};
