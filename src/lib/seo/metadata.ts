import type { Metadata } from "next";
import {
  allKeywords,
  siteConfig,
} from "./site";

const { url, name, description, applicationName, authors, creator, publisher, category, twitterHandle } =
  siteConfig;

export const metadataBase = new URL(url);

export const rootMetadata: Metadata = {
  metadataBase,
  title: {
    default: `${name} — API Health Check & REST API Testing Tool`,
    template: `%s | ${name}`,
  },
  description,
  keywords: [...allKeywords],
  applicationName,
  authors: [...authors],
  creator,
  publisher,
  category,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url,
    siteName: name,
    title: `${name} — API Health Check & REST API Security Scanner`,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${name} — API auditing platform for REST API testing and performance analysis`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} — API Analyzer & Performance Checker`,
    description,
    creator: twitterHandle,
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      { url: "/beacon-logo.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    shortcut: [{ url: "/beacon-logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: name,
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#d9ff41",
  },
};

export function reportMetadata(hostname: string): Metadata {
  return {
    title: `API Report — ${hostname}`,
    description: `API health check report for ${hostname}. View performance, security, API quality scores, and best practice findings from Beacon.`,
    robots: { index: false, follow: false },
    alternates: { canonical: undefined },
  };
}
