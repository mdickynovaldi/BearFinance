import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/config/supabase-server-config";

export async function middleware(request: NextRequest) {
  try {
    console.log("middleware executed in " + request.nextUrl.pathname);
    const route = request.nextUrl.pathname;
    const supabaseServerConfig = await createClient();
    const data = await supabaseServerConfig.auth.getUser();
    const user = data.data.user;
    const isPublicRoute = [
      "/auth/sign-in",
      "/auth/sign-up",
      "/auth/forgot-password",
      "/auth/reset-password",
    ].includes(route);
    const isPrivateRoute = !isPublicRoute;

    if (user && isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (!user && isPrivateRoute) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.log("Error dalam middleware:", error);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
