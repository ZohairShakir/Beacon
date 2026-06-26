"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

const reasons = [
  {
    title: "Fast",
    description:
      "Get a complete API audit in under 30 seconds. No queues, no waiting.",
    icon: Zap,
    iconBg: "bg-beacon-lime",
    iconColor: "text-foreground",
  },
  {
    title: "Beautiful",
    description:
      "Clean, developer-friendly reports you actually want to read and share.",
    icon: Sparkles,
    iconBg: "bg-foreground",
    iconColor: "text-white",
  },
  {
    title: "No Setup",
    description:
      "Paste a URL and go. No signup, no API keys, no configuration required.",
    icon: () => (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    iconBg: "bg-beacon-orange",
    iconColor: "text-foreground",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function WhyBeacon() {
  return (
    <section className="py-16 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Built for developers.
          </h2>
          <p className="mt-2 text-4xl font-bold leading-[1.1] tracking-tight text-neutral-300 sm:text-5xl lg:text-[3.5rem]">
            Not enterprise meetings.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-4"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={item}
                whileHover={{ x: 4 }}
                className="flex gap-5 rounded-2xl border border-beacon-border bg-white p-6 transition-shadow hover:shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${reason.iconBg} ${reason.iconColor}`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-base font-bold">{reason.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-beacon-gray">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
