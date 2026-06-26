export interface CategoryScore {
  score: number;
  findings: string[];
}

export interface ScanReport {
  id: string;
  url: string;
  hostname: string;
  faviconUrl: string;
  scannedAt: string;
  overallScore: number;
  grade: string;
  responseTimeMs: number;
  responseTimeLabel: "Excellent" | "Good" | "Fair" | "Slow";
  statusCode: number;
  contentType: string;
  payloadSize: number;
  server: string;
  categories: {
    performance: CategoryScore;
    security: CategoryScore;
    apiQuality: CategoryScore;
    bestPractices: CategoryScore;
  };
  responsePreview: string;
  headers: Record<string, string>;
}

export interface ScanUsage {
  scansUsed: number;
  scansRemaining: number;
  limit: number;
  isAuthenticated: boolean;
  requiresSignup: boolean;
}

export interface SessionUser {
  id: string;
  email: string;
}
