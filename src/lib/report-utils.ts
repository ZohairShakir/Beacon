export function getFaviconUrl(hostname: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function healthLabel(score: number): {
  label: string;
  tone: "excellent" | "good" | "fair" | "poor";
} {
  if (score >= 90) return { label: "Excellent health", tone: "excellent" };
  if (score >= 75) return { label: "Good health", tone: "good" };
  if (score >= 60) return { label: "Needs attention", tone: "fair" };
  return { label: "Critical issues", tone: "poor" };
}
