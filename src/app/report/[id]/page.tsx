import { notFound } from "next/navigation";
import { FullReport } from "@/components/FullReport";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { reportMetadata } from "@/lib/seo/metadata";
import { getReport } from "@/lib/report-store";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) return { title: "Report not found" };
  return reportMetadata(report.hostname);
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await getReport(id);

  if (!report) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <FullReport report={report} />
      </main>
      <Footer />
    </>
  );
}
