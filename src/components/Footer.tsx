import Link from "next/link";
import { Mail } from "lucide-react";
import { BeaconLogo } from "./BeaconLogo";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-beacon-border bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="sr-only">Footer</h2>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime focus-visible:ring-offset-2"
              aria-label="Beacon home"
            >
              <BeaconLogo size="lg" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-beacon-gray">
              Free API health check and REST API testing for developers.
              Performance, security, and best-practice scoring in seconds.
            </p>
            <span className="mt-5 inline-block rounded-full border border-beacon-border px-3 py-1.5 text-xs text-beacon-gray">
              Made with care for developers
            </span>
          </div>

          <nav aria-label="Product links">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-beacon-gray">
              <li>
                <a
                  href="#features"
                  className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Resource links">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm text-beacon-gray">
              <li>
                <a
                  href="#faq"
                  className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                >
                  API Testing Guide
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-beacon-gray">
              <li>
                <a
                  href="#"
                  className="rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
                >
                  Privacy
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-beacon-border pt-8 sm:flex-row">
          <p className="text-xs text-beacon-gray">
            © {new Date().getFullYear()} Beacon. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              aria-label="Beacon on GitHub"
              className="rounded text-beacon-gray hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Beacon on X"
              className="rounded text-beacon-gray hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
            >
              <XIcon className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@beacon.dev"
              aria-label="Email Beacon"
              className="rounded text-beacon-gray hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beacon-lime"
            >
              <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
