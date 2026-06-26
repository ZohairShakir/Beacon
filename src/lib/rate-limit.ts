import { cookies } from "next/headers";
import { FREE_SCAN_LIMIT, SCAN_COUNT_COOKIE } from "./constants";
import { getSessionUser } from "./session";
import type { ScanUsage } from "./types";

export async function getScanUsage(): Promise<ScanUsage> {
  const user = await getSessionUser();

  if (user) {
    return {
      scansUsed: 0,
      scansRemaining: -1,
      limit: FREE_SCAN_LIMIT,
      isAuthenticated: true,
      requiresSignup: false,
    };
  }

  const cookieStore = await cookies();
  const raw = cookieStore.get(SCAN_COUNT_COOKIE)?.value;
  const scansUsed = raw ? parseInt(raw, 10) : 0;
  const safeCount = Number.isFinite(scansUsed) ? scansUsed : 0;

  return {
    scansUsed: safeCount,
    scansRemaining: Math.max(0, FREE_SCAN_LIMIT - safeCount),
    limit: FREE_SCAN_LIMIT,
    isAuthenticated: false,
    requiresSignup: safeCount >= FREE_SCAN_LIMIT,
  };
}

export async function canScan(): Promise<boolean> {
  const usage = await getScanUsage();
  return usage.isAuthenticated || usage.scansRemaining > 0;
}

export async function incrementScanCount(): Promise<number> {
  const user = await getSessionUser();
  if (user) return 0;

  const cookieStore = await cookies();
  const raw = cookieStore.get(SCAN_COUNT_COOKIE)?.value;
  const current = raw ? parseInt(raw, 10) : 0;
  const next = (Number.isFinite(current) ? current : 0) + 1;

  cookieStore.set(SCAN_COUNT_COOKIE, String(next), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return next;
}
