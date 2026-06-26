import { NextResponse } from "next/server";
import { getScanUsage } from "@/lib/rate-limit";

export async function GET() {
  return NextResponse.json({ usage: await getScanUsage() });
}
