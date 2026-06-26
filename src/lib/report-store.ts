import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { ScanReport } from "./types";

const REPORTS_DIR = path.join(process.cwd(), ".data", "reports");

async function ensureDir() {
  await mkdir(REPORTS_DIR, { recursive: true });
}

function reportPath(id: string) {
  return path.join(REPORTS_DIR, `${id}.json`);
}

export async function saveReport(report: ScanReport): Promise<void> {
  await ensureDir();
  await writeFile(reportPath(report.id), JSON.stringify(report), "utf-8");
}

export async function getReport(id: string): Promise<ScanReport | null> {
  // If running on Vercel, fetch report from the Railway backend API
  if (process.env.VERCEL === "1" && process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reports/${id}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.report as ScanReport;
    } catch (e) {
      console.error("Error fetching report from backend:", e);
      return null;
    }
  }

  try {
    const raw = await readFile(reportPath(id), "utf-8");
    return JSON.parse(raw) as ScanReport;
  } catch {
    return null;
  }
}
