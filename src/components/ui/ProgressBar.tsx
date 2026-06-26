"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function ProgressBar({
  label,
  value,
  icon,
  delay = 0,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-sm font-medium">
          <span className="text-beacon-gray">{icon}</span>
          {label}
        </div>
        <span className="text-sm font-semibold tabular-nums">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-200/80">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-beacon-lime"
        />
      </div>
    </div>
  );
}
