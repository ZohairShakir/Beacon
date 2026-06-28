"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { formatScanDate } from "@/lib/format-date";
import { formatBytes, healthLabel } from "@/lib/report-utils";
import type { ScanReport } from "@/lib/types";
import { SiteLogo } from "./SiteLogo";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { ProgressBar } from "./ui/ProgressBar";

const healthStyles = {
  excellent: "bg-beacon-lime text-foreground",
  good: "bg-beacon-lime/60 text-foreground",
  fair: "bg-beacon-orange/80 text-foreground",
  poor: "bg-red-100 text-red-700",
};

function FindingList({
  title,
  score,
  findings,
  icon,
}: {
  title: string;
  score: number;
  findings: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-beacon-border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-beacon-gray">{icon}</span>
          <h3 className="truncate text-sm font-semibold">{title}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-beacon-gray-light px-2.5 py-0.5 text-xs font-bold tabular-nums">
          {score}/100
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {findings.map((f) => (
          <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-beacon-gray">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-beacon-lime" />
            <span className="min-w-0 break-words">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FullReport({ report }: { report: ScanReport }) {
  const health = healthLabel(report.overallScore);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-[4.5rem] sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-beacon-gray hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        Back to scanner
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 overflow-hidden rounded-xl border border-beacon-border bg-white shadow-sm sm:mt-6 sm:rounded-2xl"
      >
        <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
          <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
            <SiteLogo
              hostname={report.hostname}
              faviconUrl={report.faviconUrl}
              size="lg"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight sm:text-2xl">
                  {report.hostname}
                </h1>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${healthStyles[health.tone]}`}
                >
                  {health.label}
                </span>
              </div>
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex max-w-full items-center gap-1.5 text-sm text-beacon-gray hover:underline"
              >
                <span className="truncate break-all">{report.url}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
              <p className="mt-1 text-xs text-beacon-gray">
                {formatScanDate(report.scannedAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-beacon-border pt-4 sm:justify-end sm:border-t-0 sm:pt-0 lg:flex-col lg:items-end">
            <p className="text-xs font-medium uppercase tracking-wider text-beacon-gray lg:text-right">
              Overall score
            </p>
            <div className="text-right">
              <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                <AnimatedCounter value={report.overallScore} />
                <span className="text-lg font-semibold text-beacon-gray sm:text-xl">/100</span>
              </p>
              <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${healthStyles[health.tone]}`}>
                Grade {report.grade}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px border-t border-beacon-border bg-beacon-border md:grid-cols-3 xl:grid-cols-5">
          {[
            { label: "Response", value: `${report.responseTimeMs}ms · ${report.responseTimeLabel}` },
            { label: "HTTP Status", value: String(report.statusCode) },
            { label: "Payload", value: formatBytes(report.payloadSize) },
            { label: "Content-Type", value: report.contentType },
            { label: "Server", value: report.server },
          ].map((stat) => (
            <div key={stat.label} className="min-w-0 bg-white px-3 py-3 sm:px-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-beacon-gray">
                {stat.label}
              </p>
              <p className="mt-0.5 break-words text-sm font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-6 rounded-2xl border border-beacon-border/60 bg-beacon-gray-light p-4 sm:mt-8 sm:p-6 lg:rounded-[2.5rem] lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
          <div className="space-y-5">
            <h2 className="text-sm font-semibold">Score breakdown</h2>
            <ProgressBar label="Performance" value={report.categories.performance.score} icon={<Zap className="h-4 w-4" />} delay={0.1} />
            <ProgressBar label="Security" value={report.categories.security.score} icon={<Shield className="h-4 w-4" />} delay={0.2} />
            <ProgressBar label="API Quality" value={report.categories.apiQuality.score} icon={<Code2 className="h-4 w-4" />} delay={0.3} />
            <ProgressBar label="Best Practices" value={report.categories.bestPractices.score} icon={<Star className="h-4 w-4" />} delay={0.4} />
          </div>

          <div className="min-w-0">
            <h2 className="mb-3 text-sm font-semibold">Response preview</h2>
            <div className="overflow-hidden rounded-xl border border-beacon-border bg-white shadow-sm sm:rounded-2xl">
              <div className="flex items-center justify-between border-b border-beacon-border px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[10px] text-beacon-gray sm:text-xs">HTTP {report.statusCode}</span>
              </div>
              <pre className="max-h-64 overflow-auto p-3 font-mono text-[10px] leading-relaxed sm:max-h-96 sm:p-4 sm:text-xs">
                {report.responsePreview || "{}"}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FindingList title="Performance" score={report.categories.performance.score} findings={report.categories.performance.findings} icon={<Zap className="h-4 w-4" />} />
        <FindingList title="Security" score={report.categories.security.score} findings={report.categories.security.findings} icon={<Shield className="h-4 w-4" />} />
        <FindingList title="API Quality" score={report.categories.apiQuality.score} findings={report.categories.apiQuality.findings} icon={<Code2 className="h-4 w-4" />} />
        <FindingList title="Best Practices" score={report.categories.bestPractices.score} findings={report.categories.bestPractices.findings} icon={<Star className="h-4 w-4" />} />
      </div>

      <Link
        href="/"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white sm:mt-10 sm:inline-flex sm:w-auto"
      >
        Scan another API
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
