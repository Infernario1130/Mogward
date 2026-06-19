import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { MAIN_PACKAGE } from "@/lib/products";

export async function middleware(request) {
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
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // extract productId from /dashboard/products/[productId]
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const productId = segments[segments.length - 1];

  // ask the purchases route what this user actually owns
  const purchasesUrl = new URL("/api/dashboard/purchases", request.url);
  let purchasesRes;
  try {
    purchasesRes = await fetch(purchasesUrl, {
      headers: { cookie: `token=${token}` },
    });
  } catch (err) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!purchasesRes.ok) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const data = await purchasesRes.json();

  if (!data.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const purchasedIds = data.purchases.map((p) => p.id);
  const ownsDirectly = purchasedIds.includes(productId);
  const ownsViaBundle = purchasedIds.includes(MAIN_PACKAGE.id);

  if (!ownsDirectly && !ownsViaBundle) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/products/:path*"],
};