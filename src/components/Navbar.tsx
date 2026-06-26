"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { BeaconLogo } from "./BeaconLogo";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "GitHub", href: "https://github.com", external: true },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openAuth = (mode: "signup" | "login") => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-beacon-border/60 bg-white/90 backdrop-blur-xl shadow-sm"
            : "bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-14 min-w-0 max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="min-w-0 shrink rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime focus-visible:ring-offset-2"
            aria-label="Beacon home"
          >
            <BeaconLogo size="sm" priority className="sm:hidden" />
            <BeaconLogo size="md" priority className="hidden sm:flex" />
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-medium text-beacon-gray transition-colors hover:bg-neutral-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-beacon-gray transition-colors hover:bg-neutral-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                >
                  {link.label}
                </a>
              ),
            )}
            {user ? (
              <button
                type="button"
                onClick={() => logout()}
                className="rounded-full px-4 py-2 text-sm font-medium text-beacon-gray hover:bg-neutral-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
              >
                Log out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="rounded-full px-4 py-2 text-sm font-medium text-beacon-gray hover:bg-neutral-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
              >
                Log In
              </button>
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {!user && (
              <motion.button
                type="button"
                onClick={() => openAuth("signup")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-white sm:gap-1.5 sm:px-5 sm:py-2.5 sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime focus-visible:ring-offset-2"
              >
                <span className="hidden min-[400px]:inline">Get Started</span>
                <span className="min-[400px]:hidden">Start</span>
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
              </motion.button>
            )}

            {user && (
              <span className="hidden max-w-[120px] truncate text-xs text-beacon-gray sm:block lg:max-w-[160px]">
                {user.email}
              </span>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-beacon-border lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            role="presentation"
          >
            <motion.div
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 flex w-full max-w-[20rem] flex-col bg-white px-5 py-5 shadow-2xl sm:px-6"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between">
                <BeaconLogo size="md" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-beacon-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <nav aria-label="Mobile primary" className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="rounded-xl px-3 py-3 text-base font-medium hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                  >
                    {link.label}
                  </a>
                ))}
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="rounded-xl px-3 py-3 text-left text-base font-medium hover:bg-neutral-50"
                  >
                    Log out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuth("login")}
                    className="rounded-xl px-3 py-3 text-left text-base font-medium hover:bg-neutral-50"
                  >
                    Log In
                  </button>
                )}
              </nav>

              {!user && (
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="mt-auto rounded-full bg-foreground py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime focus-visible:ring-offset-2"
                >
                  Get Started — Free
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
