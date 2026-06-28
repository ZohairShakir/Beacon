"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  ExternalLink,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";
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

function StatPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-beacon-border bg-white px-3 py-2.5 min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-beacon-gray">
        {label}
      </p>
      <p className="mt-0.5 break-words text-sm font-semibold sm:truncate">{value}</p>
    </div>
  );
}

function CategoryMini({
  label,
  score,
  topFinding,
  icon,
}: {
  label: string;
  score: number;
  topFinding: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-beacon-border bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-beacon-gray">{icon}</span>
          {label}
        </div>
        <span className="text-lg font-bold tabular-nums">{score}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-beacon-gray">
        {topFinding}
      </p>
    </div>
  );
}

export function ReportDisplay({
  report,
  showExampleLabel = false,
}: {
  report: ScanReport;
  showExampleLabel?: boolean;
}) {
  const preview =
    report.responsePreview ||
    JSON.stringify({ status: "empty" }, null, 2);
  const health = healthLabel(report.overallScore);

  return (
    <section
      aria-labelledby="report-preview-heading"
      className="py-10 sm:py-12 lg:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {showExampleLabel && (
          <p
            id="report-preview-heading"
            className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-beacon-gray"
          >
            Example API health check report
          </p>
        )}

        {!showExampleLabel && (
          <h2 id="report-preview-heading" className="sr-only">
            API health check report
          </h2>
        )}

        {/* Site header with logo */}
        <div className="mb-6 overflow-hidden rounded-xl border border-beacon-border bg-white shadow-sm sm:rounded-2xl">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
              <SiteLogo
                hostname={report.hostname}
                faviconUrl={report.faviconUrl}
                size="lg"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold tracking-tight sm:text-xl">
                    {report.hostname}
                  </h3>
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
                  className="mt-1 inline-flex max-w-full items-center gap-1.5 truncate text-sm text-beacon-gray hover:text-foreground hover:underline"
                >
                  <span className="truncate">{report.url}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
                <p className="mt-1 text-xs text-beacon-gray">
                  Scanned {formatScanDate(report.scannedAt)}
                </p>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-row items-center justify-between gap-4 border-t border-beacon-border pt-4 sm:w-auto sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
              <p className="text-xs font-medium text-beacon-gray sm:text-right">Overall score</p>
              <div className="text-right sm:text-right">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <AnimatedCounter value={report.overallScore} />
                  <span className="text-base font-semibold text-beacon-gray sm:text-lg">/100</span>
                </p>
                <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${healthStyles[health.tone]}`}>
                  Grade {report.grade}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px border-t border-beacon-border bg-beacon-border sm:grid-cols-4">
            <StatPill label="Response" value={`${report.responseTimeMs}ms`} />
            <StatPill label="Status" value={`HTTP ${report.statusCode}`} />
            <StatPill label="Payload" value={formatBytes(report.payloadSize)} />
            <StatPill label="Content-Type" value={report.contentType} />
          </div>
        </div>

        <div className="rounded-2xl border border-beacon-border/60 bg-beacon-gray-light p-4 shadow-sm sm:p-6 lg:rounded-[2.5rem] lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
            <div className="space-y-5">
              <p className="text-sm font-semibold">Category breakdown</p>
              <ProgressBar
                label="Performance"
                value={report.categories.performance.score}
                icon={<Zap className="h-4 w-4" />}
                delay={0.1}
              />
              <ProgressBar
                label="Security"
                value={report.categories.security.score}
                icon={<Shield className="h-4 w-4" />}
                delay={0.2}
              />
              <ProgressBar
                label="API Quality"
                value={report.categories.apiQuality.score}
                icon={<Code2 className="h-4 w-4" />}
                delay={0.3}
              />
              <ProgressBar
                label="Best Practices"
                value={report.categories.bestPractices.score}
                icon={<Star className="h-4 w-4" />}
                delay={0.4}
              />

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <CategoryMini
                  label="Performance"
                  score={report.categories.performance.score}
                  topFinding={report.categories.performance.findings[0] ?? "—"}
                  icon={<Zap className="h-3.5 w-3.5" />}
                />
                <CategoryMini
                  label="Security"
                  score={report.categories.security.score}
                  topFinding={report.categories.security.findings[0] ?? "—"}
                  icon={<Shield className="h-3.5 w-3.5" />}
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">Response preview</p>
              <div className="overflow-hidden rounded-2xl border border-beacon-border bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-beacon-border px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-beacon-gray">
                    {report.server !== "unknown" ? report.server : "response.json"}
                  </span>
                </div>
                <pre className="max-h-56 overflow-auto p-3 font-mono text-[10px] leading-relaxed sm:max-h-72 sm:p-4 sm:text-xs">
                  <code>{preview}</code>
                </pre>
              </div>
              {!showExampleLabel && (
                <Link
                  href={`/report/${report.id}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-beacon-gray"
                >
                  View full report
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
