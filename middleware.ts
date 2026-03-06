import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const [user, pass] = decoded.split(":");
      if (user === "legatron" && pass === "2026") {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Juurdepääs piiratud", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Legatron Investor"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
