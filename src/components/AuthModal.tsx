"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { BeaconLogo } from "./BeaconLogo";
import { useAuth } from "@/contexts/AuthContext";

const perks = [
  "Unlimited API scans",
  "Full performance & security reports",
  "Always free — no credit card",
];

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthModal({
  open,
  onClose,
  initialMode = "signup",
  onSuccess,
  reason,
}: {
  open: boolean;
  onClose: () => void;
  initialMode?: "signup" | "login";
  onSuccess?: () => void;
  reason?: string;
}) {
  const { refresh } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (open) setMode(initialMode);
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      await refresh();
      onSuccess?.();
      onClose();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    setGoogleLoading(true);
    setError("");
    window.location.href = `/api/auth/google?mode=${mode}`;
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 backdrop-blur-md sm:items-center sm:p-4"
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[92dvh] w-full max-w-[920px] flex-col overflow-hidden overflow-y-auto rounded-t-[1.75rem] border border-beacon-border bg-white shadow-2xl sm:max-h-[90dvh] sm:flex-row sm:rounded-[1.75rem]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-beacon-border bg-white text-beacon-gray hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Brand panel */}
          <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-gradient-to-br from-beacon-lavender/50 via-beacon-lime/20 to-white p-8 md:flex lg:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
              {Array.from({ length: 5 }).map((_, row) => (
                <div
                  key={row}
                  className={`flex gap-6 py-3 ${row % 2 === 1 ? "translate-x-8" : ""}`}
                >
                  {Array.from({ length: 4 }).map((__, col) => (
                    <img
                      key={col}
                      src="/beacon-logo.svg"
                      alt=""
                      className="h-10 w-10"
                      aria-hidden
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="relative">
              <BeaconLogo size="lg" />
            </div>
            <div className="relative space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-beacon-gray">
                {mode === "signup" ? "Join Beacon" : "Welcome back"}
              </p>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-2.5 text-sm text-foreground/80"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-beacon-lime/80">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form panel */}
          <div className="flex flex-1 flex-col px-5 py-6 sm:px-8 sm:py-10 lg:px-10">
            <div className="mb-5 md:hidden">
              <BeaconLogo size="sm" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-beacon-gray">
              {mode === "signup" ? "Free forever" : "Welcome back"}
            </p>
            <h2
              id="auth-modal-title"
              className="mt-2 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl"
            >
              {mode === "signup" ? "Create your account" : "Log in to Beacon"}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-beacon-gray">
              {reason ??
                (mode === "signup"
                  ? "Unlock unlimited API scans — always free, no credit card."
                  : "Continue scanning APIs with your account.")}
            </p>

            <div className="mt-6 space-y-4">
              <button
                type="button"
                onClick={handleGoogle}
                disabled={googleLoading || loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-beacon-border bg-white px-4 py-3 text-sm font-semibold transition-colors hover:bg-neutral-50 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
              >
                {googleLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <GoogleIcon className="h-5 w-5" />
                )}
                Continue with Google
              </button>

              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-beacon-border" />
                <span className="text-xs font-medium uppercase tracking-wider text-beacon-gray">
                  or with email
                </span>
                <div className="h-px flex-1 bg-beacon-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="auth-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-beacon-border px-4 py-3 text-sm outline-none transition-shadow focus:border-beacon-lime/60 focus:shadow-[0_0_0_4px_rgba(217,255,65,0.15)]"
                  />
                </div>
                <div>
                  <label htmlFor="auth-password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete={
                      mode === "signup" ? "new-password" : "current-password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min 8 characters)"
                    className="w-full rounded-xl border border-beacon-border px-4 py-3 text-sm outline-none transition-shadow focus:border-beacon-lime/60 focus:shadow-[0_0_0_4px_rgba(217,255,65,0.15)]"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: loading || googleLoading ? 1 : 1.01 }}
                  whileTap={{ scale: loading || googleLoading ? 1 : 0.99 }}
                  type="submit"
                  disabled={loading || googleLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-semibold text-white disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime focus-visible:ring-offset-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {mode === "signup" ? "Sign up free" : "Log in"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            <p className="mt-auto pt-6 text-center text-sm text-beacon-gray">
              {mode === "signup" ? "Already have an account?" : "New to Beacon?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signup" ? "login" : "signup");
                  setError("");
                }}
                className="font-semibold text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
              >
                {mode === "signup" ? "Log in" : "Sign up free"}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
