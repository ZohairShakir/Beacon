import { ReportDisplay } from "@/components/ReportDisplay";
import { EXAMPLE_REPORT } from "@/lib/example-report";

export function ReportSection() {
  return <ReportDisplay report={EXAMPLE_REPORT} showExampleLabel />;
}
