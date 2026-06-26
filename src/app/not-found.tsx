import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BeaconLogo } from "@/components/BeaconLogo";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center px-4 py-16 text-center sm:px-6"
      >
        <BeaconLogo size="lg" className="justify-center" />
        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-beacon-gray">
          404
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-beacon-gray sm:text-base">
          This report may have expired or the link is invalid. Run a new scan to
          generate a fresh API health check report.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
