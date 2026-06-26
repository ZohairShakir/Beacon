import { NextResponse } from "next/server";
import { isGoogleAuthConfigured } from "@/lib/site-url";

export async function GET() {
  return NextResponse.json({
    google: isGoogleAuthConfigured(),
  });
}
