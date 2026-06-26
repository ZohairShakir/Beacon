"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, ExternalLink, Shield, Star, Zap } from "lucide-react";
import Link from "next/link";
import type { ScanReport } from "@/lib/types";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { ProgressBar } from "./ui/ProgressBar";

interface ReportDisplayProps {
  report: ScanReport;
  showExampleLabel?: boolean;
}

function highlightJson(raw: string): React.ReactNode {
  const lines = raw.split("\n");
  return lines.map((line, i) => {
    const colored = line
      .replace(
        /"([^"]+)":/g,
        '<span class="text-purple-600">"$1"</span>:',
      )
      .replace(
        /: "([^"]*)"/g,
        ': <span class="text-green-600">"$1"</span>',
      )
      .replace(
        /: (\d+)/g,
        ': <span class="text-orange-500">$1</span>',
      );

    return (
      <span key={i}>
        {i > 0 && "\n"}
        <span dangerouslySetInnerHTML={{ __html: colored }} />
      </span>
    );
  });
}

export function ReportDisplay({
  report,
  showExampleLabel = false,
}: ReportDisplayProps) {
  const preview =
    report.responsePreview ||
    JSON.stringify({ status: "empty", message: "No response body" }, null, 2);

  return (
    <section className="py-12 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        {showExampleLabel && (
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-beacon-gray">
            Example report
          </p>
        )}

        <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-beacon-gray">Scanned endpoint</p>
            <a
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 break-all text-sm font-medium text-foreground hover:underline"
            >
              {report.url}
              <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>
          <p className="text-xs text-beacon-gray">
            {new Date(report.scannedAt).toLocaleString()}
          </p>
        </div>

        <div className="rounded-[2rem] bg-beacon-gray-light p-6 shadow-sm lg:rounded-[2.5rem] lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-8">
            <div className="flex flex-col justify-center space-y-6">
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
                <span className="mt-3 inline-block rounded-full bg-beacon-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-foreground">
                  Grade {report.grade}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-beacon-gray">
                  Response Time
                </p>
                <div className="mt-1 flex items-baseline gap-3">
                  <p className="text-3xl font-bold tracking-tight">
                    {report.responseTimeMs}ms
                  </p>
                  <span className="rounded-full bg-beacon-lime/40 px-2.5 py-0.5 text-xs font-semibold text-foreground">
                    {report.responseTimeLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-5 border-y border-beacon-border py-8 lg:border-x lg:border-y-0 lg:px-8 lg:py-0">
              <ProgressBar
                label="Performance"
                value={report.categories.performance.score}
                icon={<Zap className="h-4 w-4" strokeWidth={2} />}
                delay={0.1}
              />
              <ProgressBar
                label="Security"
                value={report.categories.security.score}
                icon={<Shield className="h-4 w-4" strokeWidth={2} />}
                delay={0.2}
              />
              <ProgressBar
                label="API Quality"
                value={report.categories.apiQuality.score}
                icon={<Code2 className="h-4 w-4" strokeWidth={2} />}
                delay={0.3}
              />
              <ProgressBar
                label="Best Practices"
                value={report.categories.bestPractices.score}
                icon={<Star className="h-4 w-4" strokeWidth={2} />}
                delay={0.4}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="overflow-hidden rounded-2xl border border-beacon-border bg-white shadow-sm">
                <div className="flex items-center gap-1.5 border-b border-beacon-border px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-xs text-beacon-gray">
                    HTTP {report.statusCode}
                  </span>
                </div>
                <pre className="max-h-64 overflow-auto p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
                  <code>{highlightJson(preview)}</code>
                </pre>
              </div>

              <Link
                href={`/report/${report.id}`}
                className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-foreground transition-colors hover:text-beacon-gray"
              >
                View Full Report
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
