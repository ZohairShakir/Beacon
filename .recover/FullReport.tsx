"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code2, Loader2, Shield, Star, Zap } from "lucide-react";
import type { ScanReport } from "@/lib/types";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { ProgressBar } from "./ui/ProgressBar";

interface FullReportProps {
  report: ScanReport;
}

function FindingList({
  title,
  findings,
}: {
  title: string;
  findings: string[];
}) {
  return (
    <div className="rounded-2xl border border-beacon-border bg-white p-5">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {findings.map((finding) => (
          <li
            key={finding}
            className="flex gap-2 text-sm leading-relaxed text-beacon-gray"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-beacon-lime" />
            {finding}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FullReport({ report }: FullReportProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <p className="text-sm font-medium text-beacon-gray">API Report</p>
        <h1 className="mt-2 break-all text-2xl font-bold tracking-tight sm:text-3xl">
          {report.url}
        </h1>
        <p className="mt-2 text-sm text-beacon-gray">
          Scanned {new Date(report.scannedAt).toLocaleString()}
        </p>
      </motion.div>

      <div className="rounded-[2rem] bg-beacon-gray-light p-6 lg:rounded-[2.5rem] lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-beacon-gray">
                Overall API Score
              </p>
              <p className="mt-2 text-5xl font-bold tracking-tight lg:text-6xl">
                <AnimatedCounter value={report.overallScore} />
                <span className="text-2xl font-semibold text-beacon-gray lg:text-3xl">
                  /100
                </span>
              </p>
              <span className="mt-3 inline-block rounded-full bg-beacon-lime px-3 py-1 text-xs font-bold uppercase tracking-wide">
                Grade {report.grade}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-beacon-gray">
                Response Time
              </p>
              <p className="mt-1 text-3xl font-bold">{report.responseTimeMs}ms</p>
              <span className="mt-2 inline-block rounded-full bg-beacon-lime/40 px-2.5 py-0.5 text-xs font-semibold">
                {report.responseTimeLabel}
              </span>
            </div>
          </div>

          <div className="space-y-5 border-y border-beacon-border py-8 lg:border-x lg:border-y-0 lg:px-8 lg:py-0">
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
          </div>

          <div className="overflow-hidden rounded-2xl border border-beacon-border bg-white shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-beacon-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <pre className="max-h-80 overflow-auto p-4 font-mono text-xs leading-relaxed">
              {report.responsePreview || "{}"}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <FindingList
          title="Performance"
          findings={report.categories.performance.findings}
        />
        <FindingList
          title="Security"
          findings={report.categories.security.findings}
        />
        <FindingList
          title="API Quality"
          findings={report.categories.apiQuality.findings}
        />
        <FindingList
          title="Best Practices"
          findings={report.categories.bestPractices.findings}
        />
      </div>

      <a
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-sm font-semibold hover:text-beacon-gray"
      >
        Scan another API
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export function ReportLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-beacon-gray" />
      <p className="text-sm text-beacon-gray">Loading report…</p>
    </div>
  );
}
