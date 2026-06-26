import { SCAN_TIMEOUT_MS } from "../constants";
import { getFaviconUrl } from "../report-utils";
import { saveReport } from "../report-store";
import type { ScanReport } from "../types";
import {
  computeOverallScore,
  responseTimeLabel,
  scoreApiQuality,
  scoreBestPractices,
  scorePerformance,
  scoreSecurity,
  scoreToGrade,
} from "./scoring";
import { validateScanUrl } from "./validate-url";

function normalizeHeaders(headers: Headers): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key.toLowerCase()] = value;
  });
  return result;
}

function truncatePreview(body: string, maxLen = 600): string {
  const trimmed = body.trim();
  if (trimmed.length <= maxLen) return trimmed;
  try {
    const parsed = JSON.parse(trimmed);
    return JSON.stringify(parsed, null, 2).slice(0, maxLen) + "\n…";
  } catch {
    return trimmed.slice(0, maxLen) + "…";
  }
}

export async function runScan(inputUrl: string): Promise<ScanReport> {
  const url = validateScanUrl(inputUrl);
  const start = globalThis.performance.now();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SCAN_TIMEOUT_MS);

  let response: Response;
  let body = "";

  try {
    response = await fetch(url.toString(), {
      method: "GET",
      signal: controller.signal,
      headers: {
        Accept: "application/json, */*",
        "User-Agent": "Beacon-Scanner/1.0 (+https://beacon.dev)",
      },
      redirect: "follow",
    });
    body = await response.text();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Scan timed out. The API took too long to respond.");
    }
    throw new Error(
      error instanceof Error
        ? `Could not reach API: ${error.message}`
        : "Could not reach API.",
    );
  } finally {
    clearTimeout(timeout);
  }

  const responseTimeMs = Math.round(globalThis.performance.now() - start);
  const headers = normalizeHeaders(response.headers);
  const bodySize = new TextEncoder().encode(body).length;

  const categories = {
    performance: scorePerformance(responseTimeMs, headers, bodySize),
    security: scoreSecurity(url, headers),
    apiQuality: scoreApiQuality(response.status, headers, body),
    bestPractices: scoreBestPractices(url, headers),
  };

  const report: ScanReport = {
    id: crypto.randomUUID(),
    url: url.toString(),
    hostname: url.hostname,
    faviconUrl: getFaviconUrl(url.hostname),
    scannedAt: new Date().toISOString(),
    overallScore: computeOverallScore(categories),
    grade: scoreToGrade(computeOverallScore(categories)),
    responseTimeMs,
    responseTimeLabel: responseTimeLabel(responseTimeMs),
    statusCode: response.status,
    contentType: headers["content-type"]?.split(";")[0] ?? "unknown",
    payloadSize: bodySize,
    server: headers["server"] ?? headers["x-powered-by"] ?? "unknown",
    categories,
    responsePreview: truncatePreview(body),
    headers,
  };

  await saveReport(report);
  return report;
}
