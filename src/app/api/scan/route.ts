import { NextResponse } from "next/server";
import { canScan, getScanUsage, incrementScanCount } from "@/lib/rate-limit";
import { runScan } from "@/lib/scan/engine";

export async function POST(request: Request) {
  try {
    if (!(await canScan())) {
      const usage = await getScanUsage();
      return NextResponse.json(
        {
          error: "Free scan limit reached. Sign up to continue scanning.",
          requiresSignup: true,
          usage,
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const url = body?.url;
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    const report = await runScan(url);
    await incrementScanCount();
    const usage = await getScanUsage();

    return NextResponse.json({ report, usage });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Scan failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
