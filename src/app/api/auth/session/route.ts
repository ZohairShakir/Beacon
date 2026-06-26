import { NextResponse } from "next/server";
import { clearSessionCookie, getSessionUser } from "@/lib/session";

export async function GET() {
  return NextResponse.json({ user: await getSessionUser() });
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
