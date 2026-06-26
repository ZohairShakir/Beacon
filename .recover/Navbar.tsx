"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { BeaconLogo } from "./BeaconLogo";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Docs", href: "#" },
  { label: "GitHub", href: "https://github.com" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-beacon-border/60 bg-white/80 backdrop-blur-xl"
            : "bg-white/60 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:h-[72px] lg:px-8">
          <a href="/" aria-label="Beacon home" className="justify-self-start">
            <BeaconLogo />
          </a>

          <div className="hidden items-center justify-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-beacon-gray transition-colors hover:text-foreground"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
            {user ? (
              <button
                type="button"
                onClick={() => logout()}
                className="text-sm font-medium text-beacon-gray transition-colors hover:text-foreground"
              >
                Log out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="text-sm font-medium text-beacon-gray transition-colors hover:text-foreground"
              >
                Log In
              </button>
            )}
          </div>

          <div className="flex items-center justify-self-end gap-3">
            {user ? (
              <span className="hidden max-w-[140px] truncate text-xs text-beacon-gray sm:block">
                {user.email}
              </span>
            ) : (
              <motion.button
                type="button"
                onClick={() => openAuth("signup")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-foreground/90 sm:inline-flex"
              >
                Get Started
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </motion.button>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-beacon-border md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white px-6 py-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <BeaconLogo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-beacon-border"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium text-foreground"
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
                    className="text-left text-lg font-medium text-foreground"
                  >
                    Log out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuth("login")}
                    className="text-left text-lg font-medium text-foreground"
                  >
                    Log In
                  </button>
                )}
              </div>

              {!user && (
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openAuth("signup")}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-white"
                >
                  Get Started
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </motion.button>
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
