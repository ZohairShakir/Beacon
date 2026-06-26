import type { CategoryScore } from "../types";

export function scoreToGrade(score: number): string {
  if (score >= 97) return "A+";
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 83) return "B";
  if (score >= 80) return "B-";
  if (score >= 77) return "C+";
  if (score >= 73) return "C";
  if (score >= 70) return "C-";
  if (score >= 60) return "D";
  return "F";
}

export function responseTimeLabel(
  ms: number,
): "Excellent" | "Good" | "Fair" | "Slow" {
  if (ms < 200) return "Excellent";
  if (ms < 500) return "Good";
  if (ms < 1000) return "Fair";
  return "Slow";
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function scorePerformance(
  responseTimeMs: number,
  headers: Record<string, string>,
  bodySize: number,
): CategoryScore {
  let score = 100;
  const findings: string[] = [];

  if (responseTimeMs > 2000) {
    score -= 40;
    findings.push(`Slow response time (${responseTimeMs}ms).`);
  } else if (responseTimeMs > 1000) {
    score -= 25;
    findings.push(`Response time is fair (${responseTimeMs}ms).`);
  } else if (responseTimeMs > 500) {
    score -= 12;
    findings.push(`Response time is acceptable (${responseTimeMs}ms).`);
  } else {
    findings.push(`Fast response time (${responseTimeMs}ms).`);
  }

  const encoding = headers["content-encoding"]?.toLowerCase();
  if (encoding?.includes("gzip") || encoding?.includes("br")) {
    findings.push("Response uses compression.");
  } else if (bodySize > 1024) {
    score -= 15;
    findings.push("Large payload without compression detected.");
  }

  if (bodySize > 100_000) {
    score -= 10;
    findings.push(`Large payload size (${Math.round(bodySize / 1024)}KB).`);
  }

  return { score: clamp(score), findings };
}

export function scoreSecurity(
  url: URL,
  headers: Record<string, string>,
): CategoryScore {
  let score = 100;
  const findings: string[] = [];

  if (url.protocol !== "https:") {
    score -= 35;
    findings.push("API is not served over HTTPS.");
  } else {
    findings.push("HTTPS enabled.");
  }

  const securityHeaders: Array<{ key: string; label: string; penalty: number }> =
    [
      { key: "strict-transport-security", label: "HSTS", penalty: 12 },
      { key: "x-content-type-options", label: "X-Content-Type-Options", penalty: 10 },
      { key: "x-frame-options", label: "X-Frame-Options", penalty: 8 },
      { key: "content-security-policy", label: "Content-Security-Policy", penalty: 8 },
      { key: "referrer-policy", label: "Referrer-Policy", penalty: 5 },
    ];

  for (const { key, label, penalty } of securityHeaders) {
    if (headers[key]) findings.push(`${label} header present.`);
    else {
      score -= penalty;
      findings.push(`Missing ${label} header.`);
    }
  }

  const cors = headers["access-control-allow-origin"];
  if (cors === "*") {
    score -= 8;
    findings.push("CORS allows all origins (*).");
  } else if (cors) {
    findings.push("CORS configured.");
  }

  return { score: clamp(score), findings };
}

export function scoreApiQuality(
  statusCode: number,
  headers: Record<string, string>,
  body: string,
): CategoryScore {
  let score = 100;
  const findings: string[] = [];

  if (statusCode >= 200 && statusCode < 300) {
    findings.push(`Successful status code (${statusCode}).`);
  } else if (statusCode >= 400) {
    score -= 25;
    findings.push(`Error status code (${statusCode}).`);
  } else {
    score -= 10;
    findings.push(`Unexpected status code (${statusCode}).`);
  }

  const contentType = headers["content-type"]?.toLowerCase() ?? "";
  if (contentType.includes("application/json")) {
    findings.push("JSON content type detected.");
    try {
      JSON.parse(body);
      findings.push("Valid JSON response body.");
    } catch {
      score -= 30;
      findings.push("Response claims JSON but body is invalid.");
    }
  } else if (contentType) {
    score -= 10;
    findings.push(`Non-JSON content type: ${contentType.split(";")[0]}.`);
  } else {
    score -= 15;
    findings.push("Missing Content-Type header.");
  }

  return { score: clamp(score), findings };
}

export function scoreBestPractices(
  url: URL,
  headers: Record<string, string>,
): CategoryScore {
  let score = 100;
  const findings: string[] = [];

  const hasVersion =
    /\/v\d+(\/|$)/.test(url.pathname) ||
    headers["api-version"] ||
    headers["x-api-version"];
  if (hasVersion) findings.push("API versioning detected.");
  else {
    score -= 12;
    findings.push("No API versioning detected in URL or headers.");
  }

  if (headers["x-ratelimit-limit"] || headers["ratelimit-limit"]) {
    findings.push("Rate limit headers present.");
  } else {
    score -= 10;
    findings.push("No rate limit headers detected.");
  }

  if (headers["cache-control"]) findings.push("Cache-Control header present.");
  else {
    score -= 8;
    findings.push("Missing Cache-Control header.");
  }

  if (headers["x-request-id"] || headers["x-correlation-id"]) {
    findings.push("Request tracing header present.");
  } else {
    score -= 5;
    findings.push("No request ID header for tracing.");
  }

  return { score: clamp(score), findings };
}

export function computeOverallScore(categories: {
  performance: CategoryScore;
  security: CategoryScore;
  apiQuality: CategoryScore;
  bestPractices: CategoryScore;
}): number {
  return Math.round(
    categories.performance.score * 0.3 +
      categories.security.score * 0.3 +
      categories.apiQuality.score * 0.25 +
      categories.bestPractices.score * 0.15,
  );
}
