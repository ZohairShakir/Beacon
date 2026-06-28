"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Link2, Loader2, Shield, Zap } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { BeaconLogoMark } from "./BeaconLogo";
import { HeroGraphic } from "./HeroGraphic";
import { useAuth } from "@/contexts/AuthContext";
import { FREE_SCAN_LIMIT } from "@/lib/constants";

const features = [
  {
    icon: Zap,
    title: "Performance audit",
    description: "Analyze response time, DNS, TTFB, payload and compression.",
  },
  {
    icon: Shield,
    title: "Security checks",
    description: "Inspect HTTPS, CORS, headers and common vulnerabilities.",
  },
  {
    icon: Clock,
    title: "Results in 30 seconds",
    description: "No signup required. Scan any public REST API instantly.",
  },
];

export function Hero() {
  const router = useRouter();
  const { usage, refresh, user } = useAuth();
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authOpen, setAuthOpen] = useState(false);

  const runScan = async (targetUrl: string) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl.trim() }),
      });
      const data = await res.json();
      await refresh();

      if (res.status === 403 && data.requiresSignup) {
        setAuthOpen(true);
        return;
      }
      if (!res.ok) {
        setError(data.error ?? "Scan failed. Please try again.");
        return;
      }
      router.push(`/report/${data.report.id}`);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Enter an API URL to scan.");
      return;
    }
    if (usage?.requiresSignup && !user) {
      setAuthOpen(true);
      return;
    }
    await runScan(url);
  };

  const scansLeft = usage?.scansRemaining ?? FREE_SCAN_LIMIT;

  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="pt-[4.5rem] pb-6 sm:pt-24 sm:pb-8 lg:pt-28 lg:pb-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl border border-beacon-border bg-white shadow-sm sm:rounded-[1.75rem] lg:rounded-[2rem]"
          >
            <div className="grid items-center gap-6 px-3 py-6 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-2 lg:gap-6 lg:px-10 lg:py-14 xl:px-14">
              <div className="min-w-0 max-w-xl">
                <motion.h1
                  id="hero-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative text-[1.625rem] font-medium leading-[1.15] tracking-tight min-[400px]:text-[1.875rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.25rem]"
                >
                  <span
                    className="absolute -left-1 top-8 hidden lg:block"
                    aria-hidden
                  >
                    <BeaconLogoMark size={32} className="h-8 w-8 opacity-90" />
                  </span>
                  Know what&apos;s{" "}
                  <span
                    className="box-decoration-clone rounded-2xl bg-beacon-lavender px-2 py-0.5"
                    style={{ WebkitBoxDecorationBreak: "clone" }}
                  >
                    wrong with
                  </span>
                  <br />
                  <span
                    className="box-decoration-clone rounded-2xl bg-beacon-lavender px-2 py-0.5"
                    style={{ WebkitBoxDecorationBreak: "clone" }}
                  >
                    your API.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 max-w-md text-sm leading-relaxed text-beacon-gray sm:mt-6 sm:text-base"
                >
                  Free REST API testing tool for API health checks, security
                  scanning, performance analysis, and API score grading — like
                  Google Lighthouse, built for APIs.
                </motion.p>

                {/* Prominent scan bar in main hero frame */}
                <motion.form
                  onSubmit={handleScan}
                  aria-label="Scan API endpoint"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 w-full max-w-xl sm:mt-8"
                >
                  <div
                    className={`rounded-2xl border-2 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all sm:rounded-full sm:p-1.5 ${
                      focused
                        ? "border-beacon-lime shadow-[0_8px_30px_rgba(217,255,65,0.15),0_0_0_4px_rgba(217,255,65,0.12)]"
                        : "border-neutral-200"
                    }`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 items-center gap-3 pl-3 sm:pl-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                          <Link2 className="h-4 w-4 text-beacon-gray" />
                        </div>
                        <input
                          id="api-url"
                          name="url"
                          type="url"
                          autoComplete="url"
                          aria-label="API endpoint URL"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://api.example.com/users"
                          onFocus={() => setFocused(true)}
                          onBlur={() => setFocused(false)}
                          disabled={loading}
                          className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-neutral-400 disabled:opacity-60 sm:py-3.5 sm:text-base"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: loading ? 1 : 1.02 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white disabled:opacity-70 sm:w-auto sm:rounded-full"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Scanning…
                          </>
                        ) : (
                          <>
                            Scan API
                            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {error && (
                    <p className="mt-3 text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  {!user && usage && scansLeft >= 0 && (
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-beacon-gray">
                        {scansLeft === 0 ? (
                          <>
                            No free scans left.{" "}
                            <button
                              type="button"
                              onClick={() => setAuthOpen(true)}
                              className="font-semibold text-foreground underline"
                            >
                              Sign up free
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="font-semibold text-foreground">
                              {scansLeft}
                            </span>{" "}
                            of {FREE_SCAN_LIMIT} free scans per day — no credit card
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  <p className="mt-3 flex items-center gap-1.5 text-xs text-beacon-gray">
                    <Shield className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                    <span>We never store your endpoint URLs or request payload data.</span>
                  </p>
                </motion.form>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="relative mx-auto w-full max-w-[420px] min-w-0 overflow-hidden rounded-2xl border border-beacon-border bg-black shadow-lg"
              >
                <video
                  src="/beacon-demo.mp4"
                  poster="/beaconlogo.svg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="aspect-video w-full object-cover"
                />
              </motion.div>
            </div>

            {/* Bottom feature bar */}
            {/* Bottom feature bar */}
            <div className="grid gap-px border-t border-beacon-border bg-beacon-border sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex gap-3 bg-white p-4 sm:gap-4 sm:p-6 lg:p-8"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-beacon-gray-light">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide sm:text-[13px]">
                        {feature.title}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-beacon-gray sm:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode="signup"
        reason="You've used all 5 free scans. Create a free account to keep scanning."
        onSuccess={() => {
          if (url.trim()) runScan(url);
        }}
      />
    </>
  );
}
