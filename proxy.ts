import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "rectronx.com";

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = (forwardedHost ?? request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  if (host === `www.${CANONICAL_HOST}`) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.hostname = CANONICAL_HOST;
    destination.port = "";
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
