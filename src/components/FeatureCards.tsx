"use client";

import { motion } from "framer-motion";
import { Gauge, PieChart, Share2, Shield } from "lucide-react";

const features = [
  {
    number: "01",
    title: "Performance",
    description:
      "API performance checker for response time, TTFB, payload size, and compression.",
    icon: Gauge,
    bg: "bg-beacon-lime",
    text: "text-foreground",
    border: "",
    accent: "bg-foreground/10",
  },
  {
    number: "02",
    title: "Security",
    description: "API security scanner for HTTPS, CORS, headers, and vulnerabilities.",
    icon: Shield,
    bg: "bg-foreground",
    text: "text-white",
    border: "",
    accent: "bg-white/10",
  },
  {
    number: "03",
    title: "API Score",
    description: "Professional API audit grade with a detailed category breakdown.",
    icon: PieChart,
    bg: "bg-beacon-orange",
    text: "text-foreground",
    border: "",
    accent: "bg-foreground/10",
  },
  {
    number: "04",
    title: "Share",
    description: "Share health check reports, compare APIs, and export results.",
    icon: Share2,
    bg: "bg-white",
    text: "text-foreground",
    border: "border border-beacon-border",
    accent: "bg-beacon-gray-light",
  },
];

export function FeatureCards() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-8 sm:py-10 lg:py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2
            id="features-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Complete API auditing capabilities
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-beacon-gray sm:text-base">
            Everything you need for REST API testing, endpoint analysis, and
            API best-practice monitoring in one free developer tool.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.article
                key={f.title}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                whileHover={{ y: -4 }}
                className={`flex min-h-[220px] flex-col rounded-2xl p-5 sm:min-h-[260px] sm:rounded-[1.75rem] sm:p-6 lg:min-h-[320px] lg:rounded-[2rem] lg:p-8 ${f.bg} ${f.text} ${f.border}`}
              >
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest ${f.accent}`}
                >
                  {f.number}
                </span>

                <div
                  className={`mt-5 flex h-12 w-12 items-center justify-center rounded-2xl ${f.accent}`}
                  aria-hidden
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-80">
                  {f.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
