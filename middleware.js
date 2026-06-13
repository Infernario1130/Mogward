import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  // get the token cookie (same name you set in login route)
  const token = request.cookies.get("token")?.value;

  // no token = not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // verify the token using your JWT_SECRET
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
  } catch (err) {
    // token invalid or expired
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// only protect product pages
export const config = {
  matcher: ["/dashboard/products/:path*"],
};