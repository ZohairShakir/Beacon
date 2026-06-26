import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d9ff41",
    categories: ["developer", "productivity", "utilities"],
    icons: [
      {
        src: "/beacon-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any" as const,
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any" as const,
      },
    ],
  };
}
