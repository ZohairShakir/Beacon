"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Link2, Loader2 } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { BeaconIllustration } from "./BeaconIllustration";
import { TrustRow } from "./TrustRow";
import { useAuth } from "@/contexts/AuthContext";
import { FREE_SCAN_LIMIT } from "@/lib/constants";

export function Hero() {
  const router = useRouter();
  const { usage, refresh, user } = useAuth();
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authOpen, setAuthOpen] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Enter an API URL to scan.");
      return;
    }

    if (usage?.requiresSignup && !user) {
      setAuthOpen(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
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

  const scansLeft = usage?.scansRemaining ?? FREE_SCAN_LIMIT;
  const showUsage = !user && usage && scansLeft >= 0;

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 lg:opacity-100">
          <div className="translate-y-8 scale-90 lg:translate-y-4 lg:scale-100">
            <BeaconIllustration />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[5.25rem] xl:text-[5.75rem]"
          >
            Know what&apos;s
            <br />
            wrong with
            <br />
            your <span className="text-beacon-lime">API.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-beacon-gray sm:text-lg"
          >
            Instantly analyze performance, security and best practices of any
            REST API.
          </motion.p>

          <motion.form
            onSubmit={handleScan}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 w-full max-w-2xl"
          >
            <div
              className={`flex flex-col gap-2 rounded-2xl border bg-white/90 p-2 backdrop-blur-sm transition-all duration-300 sm:flex-row sm:items-center sm:rounded-full sm:p-1.5 ${
                focused
                  ? "border-beacon-lime/60 shadow-[0_0_0_4px_rgba(217,255,65,0.15)]"
                  : "border-beacon-border shadow-sm"
              }`}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 pl-3 sm:pl-4">
                <Link2 className="h-5 w-5 shrink-0 text-beacon-gray" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://api.example.com/users"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  disabled={loading}
                  className="min-w-0 flex-1 bg-transparent py-3 text-left text-sm text-foreground outline-none placeholder:text-neutral-400 disabled:opacity-60 sm:text-base"
                />
              </div>
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-white disabled:opacity-70 sm:w-auto sm:rounded-full sm:px-6"
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

            {error && (
              <p className="mt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            {showUsage && (
              <p className="mt-3 text-xs text-beacon-gray">
                {scansLeft === 0 ? (
                  <>
                    No free scans left.{" "}
                    <button
                      type="button"
                      onClick={() => setAuthOpen(true)}
                      className="font-semibold text-foreground underline-offset-2 hover:underline"
                    >
                      Sign up free
                    </button>{" "}
                    to continue.
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-foreground">
                      {scansLeft}
                    </span>{" "}
                    of {FREE_SCAN_LIMIT} free scans remaining — no credit card
                    required.
                  </>
                )}
              </p>
            )}

            {user && (
              <p className="mt-3 text-xs text-beacon-gray">
                Signed in as{" "}
                <span className="font-semibold text-foreground">
                  {user.email}
                </span>{" "}
                — unlimited scans.
              </p>
            )}
          </motion.form>

          <div className="mt-6">
            <TrustRow />
          </div>
        </div>
      </section>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode="signup"
        reason="You've used all 5 free scans. Create a free account to keep scanning."
        onSuccess={() => {
          if (url.trim()) handleScan({ preventDefault: () => {} } as React.FormEvent);
        }}
      />
    </>
  );
}
