import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/site";

export const alt = `${siteConfig.name} — API health check and REST API testing platform`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217,255,65,0.45) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#d9ff41",
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 700 }}>{siteConfig.name}.</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#0a0a0a",
            maxWidth: 900,
          }}
        >
          API Health Check & REST API Testing
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#737373",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Performance, security, API quality & best practices — scored in seconds.
        </div>
      </div>
    ),
    { ...size },
  );
}
