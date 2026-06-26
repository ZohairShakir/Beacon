"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const rings = [100, 150, 200, 260, 320, 380];

export function BeaconIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative mx-auto flex h-[280px] w-full max-w-[440px] items-center justify-center sm:h-[360px] lg:h-[480px]"
      aria-hidden
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 440 480" fill="none">
        {rings.map((r, i) => (
          <motion.circle
            key={r}
            cx="220"
            cy="240"
            r={r / 2}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 - i * 0.02 }}
            transition={{ delay: 0.35 + i * 0.07 }}
            stroke="#d4d4d4"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        ))}
      </svg>
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-32 w-32 rounded-full bg-beacon-lime/60 blur-3xl lg:h-40 lg:w-40"
      />
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-beacon-lime/25 ring-1 ring-beacon-lime/40"
      >
        <Sparkles className="h-7 w-7 text-foreground" strokeWidth={1.75} />
      </motion.div>
    </motion.div>
  );
}
