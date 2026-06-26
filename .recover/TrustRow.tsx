"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const items = [
  "No signup required",
  "Public APIs",
  "Results under 30 seconds",
  "Privacy First",
];

export function TrustRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start"
    >
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-2 text-sm text-beacon-gray">
          <Check
            className={`h-4 w-4 shrink-0 ${i === 0 ? "text-beacon-lime" : "text-foreground"}`}
            strokeWidth={2.5}
          />
          <span>{item}</span>
        </div>
      ))}
    </motion.div>
  );
}
