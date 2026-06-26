import Image from "next/image";

interface BeaconLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

const sizeMap = {
  sm: { icon: 24, text: "text-base" },
  md: { icon: 32, text: "text-lg" },
  lg: { icon: 44, text: "text-xl" },
  xl: { icon: 56, text: "text-2xl" },
};

export function BeaconLogo({
  className = "",
  showWordmark = true,
  size = "md",
  priority = false,
}: BeaconLogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/beacon-logo.svg"
        alt=""
        width={icon}
        height={icon}
        priority={priority}
        unoptimized
        className="shrink-0"
        aria-hidden={showWordmark}
      />
      {showWordmark && (
        <span className={`${text} font-bold tracking-tight`}>Beacon.</span>
      )}
      {!showWordmark && <span className="sr-only">Beacon</span>}
    </div>
  );
}

/** Logo mark only — for hero illustration and decorative use */
export function BeaconLogoMark({
  className = "",
  size = 160,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/beacon-logo.svg"
      alt="Beacon logo"
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
