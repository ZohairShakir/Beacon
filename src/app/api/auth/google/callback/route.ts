import { NextResponse } from "next/server";
import { findOrCreateGoogleUser } from "@/lib/auth-store";
import { SESSION_COOKIE } from "@/lib/constants";
import {
  GOOGLE_MODE_COOKIE,
  GOOGLE_STATE_COOKIE,
  exchangeGoogleCode,
  fetchGoogleUserInfo,
} from "@/lib/google-oauth";
import { createSessionToken } from "@/lib/session";
import { getSiteUrl, isGoogleAuthConfigured } from "@/lib/site-url";

export async function GET(request: Request) {
  const siteUrl = getSiteUrl();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/?auth_error=${encodeURIComponent(error)}`, siteUrl),
    );
  }

  if (!isGoogleAuthConfigured() || !code || !state) {
    return NextResponse.redirect(
      new URL("/?auth_error=google_auth_failed", siteUrl),
    );
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const savedState = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${GOOGLE_STATE_COOKIE}=`))
    ?.split("=")[1];

  if (!savedState || savedState !== state) {
    return NextResponse.redirect(
      new URL("/?auth_error=invalid_state", siteUrl),
    );
  }

  try {
    const accessToken = await exchangeGoogleCode(code);
    const profile = await fetchGoogleUserInfo(accessToken);
    const user = await findOrCreateGoogleUser(
      profile.sub,
      profile.email,
      profile.name,
    );
    const token = await createSessionToken(user);
    const secure = process.env.NODE_ENV === "production";

    const response = NextResponse.redirect(new URL("/?auth=success", siteUrl));
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    response.cookies.set(GOOGLE_STATE_COOKIE, "", { path: "/", maxAge: 0 });
    response.cookies.set(GOOGLE_MODE_COOKIE, "", { path: "/", maxAge: 0 });
    return response;
  } catch {
    return NextResponse.redirect(
      new URL("/?auth_error=google_auth_failed", siteUrl),
    );
  }
}
