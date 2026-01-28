import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ONLY_PATHS = ["/admin", "/create-user", "/user-list", "/settings"];
const MANAGER_ONLY_PATHS = ["/manager", "/upload", "/excel-edit"];

const encoder = new TextEncoder();

const matchesPath = (pathname: string, collections: string[]) =>
  collections.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

async function verifyJwt(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwtVerify(token, encoder.encode(process.env.JWT_SECRET));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await verifyJwt(token);
    const role = (payload as { role?: string }).role;

    if (!role) {
      throw new Error("Missing role in token");
    }
    const wantsAdmin = matchesPath(pathname, ADMIN_ONLY_PATHS);
    const wantsManager = matchesPath(pathname, MANAGER_ONLY_PATHS);

    if (wantsAdmin && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/manager/dashboard", request.url));
    }

    if (wantsManager && role !== "MANAGER") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed", error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/manager/:path*",
    "/create-user",
    "/user-list",
    "/settings",
    "/upload",
    "/excel-edit",
  ],
};


