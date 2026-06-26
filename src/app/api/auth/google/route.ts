import { NextResponse } from "next/server";
import {
  GOOGLE_MODE_COOKIE,
  GOOGLE_STATE_COOKIE,
  buildGoogleAuthUrl,
} from "@/lib/google-oauth";
import { getSiteUrl, isGoogleAuthConfigured } from "@/lib/site-url";

export async function GET(request: Request) {
  if (!isGoogleAuthConfigured()) {
    return NextResponse.redirect(
      new URL("/?auth_error=google_not_configured", getSiteUrl()),
    );
  }

  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") === "login" ? "login" : "signup";
  const state = crypto.randomUUID();

  const response = NextResponse.redirect(buildGoogleAuthUrl(state));
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set(GOOGLE_STATE_COOKIE, state, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });
  response.cookies.set(GOOGLE_MODE_COOKIE, mode, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
