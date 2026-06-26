"use client";

import { motion } from "framer-motion";

const ROWS = 8;
const COLS = 5;

export function HeroGraphic() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-[1.25rem] border border-beacon-border/60 bg-gradient-to-br from-neutral-50 via-white to-beacon-lavender/25 min-[400px]:max-w-[300px] sm:max-w-[340px] sm:rounded-[1.75rem] lg:max-w-[420px]"
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex w-max flex-col justify-center gap-3 py-4 sm:gap-5 sm:py-6 lg:gap-6 lg:py-8">
          {Array.from({ length: ROWS }).map((_, row) => {
            const offset = row % 2 === 1;
            return (
              <motion.div
                key={row}
                initial={{ opacity: 0, x: offset ? 8 : -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: row * 0.05 }}
                className={`flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8 ${
                  offset ? "translate-x-5 sm:translate-x-8 lg:translate-x-10" : ""
                }`}
              >
                {Array.from({ length: COLS + (offset ? 1 : 0) }).map((__, col) => (
                  <img
                    key={`${row}-${col}`}
                    src="/beacon-logo.svg"
                    alt=""
                    className="h-8 w-8 shrink-0 opacity-[0.32] sm:h-11 sm:w-11 md:h-12 md:w-12 lg:h-16 lg:w-16"
                    draggable={false}
                  />
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,white_92%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/20" />
    </div>
  );
}
