"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

const reasons = [
  {
    title: "Fast",
    description: "Get a complete API audit in under 30 seconds. No queues, no waiting.",
    icon: Zap,
    iconBg: "bg-beacon-lime",
    iconColor: "text-foreground",
  },
  {
    title: "Beautiful",
    description: "Clean, developer-friendly reports you actually want to read and share.",
    icon: Sparkles,
    iconBg: "bg-foreground",
    iconColor: "text-white",
  },
  {
    title: "No Setup",
    description: "Paste a URL and go. No signup, no API keys, no configuration required.",
    icon: Sparkles,
    iconBg: "bg-beacon-orange",
    iconColor: "text-foreground",
  },
];

export function WhyBeacon() {
  return (
    <section className="py-12 sm:py-16 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.5rem]">
            Built for developers.
          </h2>
          <p className="mt-2 text-3xl font-bold leading-[1.1] tracking-tight text-neutral-300 sm:text-4xl lg:text-[3.5rem]">
            Not enterprise meetings.
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex gap-4 rounded-xl border border-beacon-border bg-white p-4 shadow-sm sm:gap-5 sm:rounded-2xl sm:p-6"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${r.iconBg} ${r.iconColor}`}>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-beacon-gray">{r.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
