import { Github, Mail, Twitter } from "lucide-react";
import { BeaconLogo } from "./BeaconLogo";

const productLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Changelog", href: "#" },
];

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "API", href: "#" },
  { label: "Blog", href: "#" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Privacy", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-beacon-border">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <BeaconLogo />
            <p className="mt-3 text-sm text-beacon-gray">
              Illuminate your API.
            </p>
            <span className="mt-4 inline-block rounded-full border border-beacon-border px-3 py-1.5 text-xs text-beacon-gray">
              Made with ❤️ by indie hackers
            </span>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-beacon-gray transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-beacon-gray transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-beacon-gray transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-beacon-border pt-8 sm:flex-row">
          <p className="text-xs text-beacon-gray">
            © {new Date().getFullYear()} Beacon. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="GitHub"
              className="text-beacon-gray transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" strokeWidth={1.75} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-beacon-gray transition-colors hover:text-foreground"
            >
              <Twitter className="h-5 w-5" strokeWidth={1.75} />
            </a>
            <a
              href="#"
              aria-label="Email"
              className="text-beacon-gray transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
