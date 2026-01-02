// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const sessionId = request.cookies.get("session_id")?.value;

  if (!sessionId) {
    response.cookies.set("session_id", crypto.randomUUID(), {
      httpOnly: true,
      path: "/",
    });
  }

  return response;
}
