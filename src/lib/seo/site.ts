export const siteConfig = {
  name: "Beacon",
  applicationName: "Beacon",
  tagline: "Know what's wrong with your API before your users do.",
  description:
    "Beacon is a free API auditing platform for REST API testing, API health checks, performance analysis, security scanning, and best-practice scoring — like Google Lighthouse for APIs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://beacon.dev",
  creator: "Beacon",
  publisher: "Beacon",
  authors: [{ name: "Beacon", url: "https://beacon.dev" }],
  category: "Developer Tools",
  twitterHandle: "@beaconapi",
  locale: "en_US",
} as const;

export const primaryKeywords = [
  "API Testing",
  "API Health Check",
  "API Performance",
  "REST API Testing",
  "API Security Scanner",
  "API Analyzer",
  "API Audit",
  "API Monitoring",
  "API Best Practices",
  "API Score",
] as const;

export const secondaryKeywords = [
  "Google Lighthouse for APIs",
  "API Performance Checker",
  "API Debugging",
  "REST API Validator",
  "API Response Analyzer",
  "Endpoint Testing",
  "Developer Tools",
  "API Documentation Testing",
] as const;

export const allKeywords = [...primaryKeywords, ...secondaryKeywords];

export const faqItems = [
  {
    question: "What is Beacon?",
    answer:
      "Beacon is an API auditing platform that analyzes any public REST API for performance, security, API quality, and best practices. Paste an endpoint URL and receive a detailed health check report in under 30 seconds.",
  },
  {
    question: "How does Beacon's API health check work?",
    answer:
      "Beacon sends a secure server-side request to your API endpoint, measures response time and payload characteristics, inspects security headers and HTTPS configuration, validates JSON responses, and scores best practices to produce an overall API score.",
  },
  {
    question: "Is Beacon free to use?",
    answer:
      "Yes. Beacon offers free API scans with no credit card required. You get several free scans before creating a free account for unlimited REST API testing and monitoring.",
  },
  {
    question: "What does the API score measure?",
    answer:
      "The API score combines performance, security, API quality, and best practices into a single grade from 0–100, helping developers quickly identify issues during endpoint testing and API debugging.",
  },
  {
    question: "Can Beacon scan any REST API?",
    answer:
      "Beacon can analyze any publicly accessible HTTP or HTTPS REST API endpoint. Private networks, localhost, and authenticated URLs are blocked for security.",
  },
] as const;
