import { NextResponse, type NextRequest } from "next/server";
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "./components/auth/core/session";

const privateRoutes = ["/app"];
const adminRoutes = ["/app/admin"];

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => request.cookies.get(key),
  });

  return response;
}

async function middlewareAuth(request: NextRequest) {
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (adminRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (user == null) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/app", request.url));
    }
  }

  if (["/sign-in", "/sign-up"].includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession(request.cookies);
    if (user != null) {
      return NextResponse.redirect(new URL("/settings", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
