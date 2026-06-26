"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

interface SiteLogoProps {
  hostname: string;
  faviconUrl: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-9 w-9 rounded-lg text-xs sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm",
  md: "h-12 w-12 rounded-xl text-sm sm:h-14 sm:w-14 sm:rounded-2xl sm:text-base",
  lg: "h-14 w-14 rounded-xl text-base sm:h-16 sm:w-16 sm:rounded-2xl sm:text-lg",
};

export function SiteLogo({ hostname, faviconUrl, size = "md" }: SiteLogoProps) {
  const [failed, setFailed] = useState(false);
  const letter = hostname.charAt(0).toUpperCase();

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center bg-beacon-lavender font-bold text-foreground ${sizes[size]}`}
      >
        {letter}
      </div>
    );
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden border border-beacon-border bg-white p-1.5 shadow-sm ${sizes[size]}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={faviconUrl}
        alt={`${hostname} favicon`}
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function SiteLogoFallback({ hostname }: { hostname: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-beacon-border bg-neutral-50">
      <Globe className="h-6 w-6 text-beacon-gray" />
      <span className="sr-only">{hostname}</span>
    </div>
  );
}
