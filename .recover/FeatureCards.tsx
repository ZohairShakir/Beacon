"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Gauge,
  PieChart,
  Share2,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  bg: string;
  text: string;
  iconColor: string;
  border?: string;
  arrowBg: string;
  arrowColor: string;
  divider: string;
}

const features: Feature[] = [
  {
    number: "01.",
    title: "Performance",
    description:
      "Analyze response time, DNS, TTFB, payload and compression.",
    icon: Gauge,
    bg: "bg-beacon-lime",
    text: "text-foreground",
    iconColor: "text-foreground",
    arrowBg: "bg-foreground",
    arrowColor: "text-white",
    divider: "border-foreground/15",
  },
  {
    number: "02.",
    title: "Security",
    description: "Inspect HTTPS, CORS, headers and vulnerabilities.",
    icon: Shield,
    bg: "bg-foreground",
    text: "text-white",
    iconColor: "text-white",
    arrowBg: "bg-white",
    arrowColor: "text-foreground",
    divider: "border-white/20",
  },
  {
    number: "03.",
    title: "API Score",
    description: "Generate a professional grade with detailed breakdown.",
    icon: PieChart,
    bg: "bg-beacon-orange",
    text: "text-foreground",
    iconColor: "text-foreground",
    arrowBg: "bg-foreground",
    arrowColor: "text-white",
    divider: "border-foreground/15",
  },
  {
    number: "04.",
    title: "Share",
    description: "Share reports, compare APIs and export PDF.",
    icon: Share2,
    bg: "bg-white",
    text: "text-foreground",
    iconColor: "text-foreground",
    border: "border border-beacon-border",
    arrowBg: "bg-foreground",
    arrowColor: "text-white",
    divider: "border-foreground/10",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function FeatureCards() {
  return (
    <section className="py-8 lg:py-12">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 lg:px-8"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.article
              key={feature.title}
              variants={card}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className={`group flex min-h-[340px] flex-col rounded-3xl p-7 lg:min-h-[380px] lg:p-8 ${feature.bg} ${feature.text} ${feature.border ?? ""}`}
            >
              <Icon
                className={`mb-6 h-7 w-7 ${feature.iconColor}`}
                strokeWidth={1.75}
              />

              <p className="text-sm font-medium opacity-70">{feature.number}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight lg:text-[1.65rem]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80 lg:text-[0.9375rem]">
                {feature.description}
              </p>

              <div className="mt-auto pt-8">
                <div className={`mb-5 border-t ${feature.divider}`} />
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    aria-label={`Learn more about ${feature.title}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${feature.arrowBg}`}
                  >
                    <ArrowRight
                      className={`h-4 w-4 ${feature.arrowColor}`}
                      strokeWidth={2.5}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
