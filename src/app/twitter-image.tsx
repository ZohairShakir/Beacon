import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/site";

export const alt = `${siteConfig.name} — API analyzer for developers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700, color: "#d9ff41" }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15, maxWidth: 900 }}>
          Know what&apos;s wrong with your API
        </div>
        <div style={{ fontSize: 26, color: "#a3a3a3" }}>
          Free API audit · Security scanner · Performance checker
        </div>
      </div>
    ),
    { ...size },
  );
}
