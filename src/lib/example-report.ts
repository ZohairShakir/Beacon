import type { ScanReport } from "./types";

export const EXAMPLE_REPORT: ScanReport = {
  id: "example",
  url: "https://api.example.com/users",
  hostname: "api.example.com",
  faviconUrl: "https://www.google.com/s2/favicons?domain=api.example.com&sz=128",
  scannedAt: "2026-06-26T09:50:14.000Z",
  overallScore: 92,
  grade: "A",
  responseTimeMs: 243,
  responseTimeLabel: "Good",
  statusCode: 200,
  contentType: "application/json",
  payloadSize: 284,
  server: "nginx",
  categories: {
    performance: {
      score: 96,
      findings: ["Fast response time (243ms).", "Response uses compression."],
    },
    security: {
      score: 82,
      findings: ["HTTPS enabled.", "Missing HSTS header."],
    },
    apiQuality: {
      score: 90,
      findings: ["Valid JSON response body.", "Successful status code (200)."],
    },
    bestPractices: {
      score: 95,
      findings: ["Cache-Control header present.", "Rate limit headers present."],
    },
  },
  responsePreview: JSON.stringify(
    { status: "success", data: { id: 123, name: "John Doe" } },
    null,
    2,
  ),
  headers: { server: "nginx", "content-type": "application/json" },
};
