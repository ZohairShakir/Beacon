import { connectToDatabase } from "./mongodb";
import type { ScanReport } from "./types";

export async function saveReport(report: ScanReport): Promise<void> {
  const { db } = await connectToDatabase();
  const collection = db.collection<ScanReport>("reports");

  // Upsert the report by ID
  await collection.updateOne(
    { id: report.id },
    { $set: report },
    { upsert: true }
  );
}

export async function getReport(id: string): Promise<ScanReport | null> {
  // If running on Vercel, fetch report from the Railway backend API
  if (process.env.VERCEL === "1" && process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reports/${id}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.report as ScanReport;
    } catch (e) {
      console.error("Error fetching report from backend:", e);
      return null;
    }
  }

  // Read directly from MongoDB
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection<ScanReport>("reports");
    const report = await collection.findOne({ id });
    
    // MongoDB returns _id alongside the document fields, we delete it or cast to ScanReport
    if (report) {
      const { _id, ...rest } = report as any;
      return rest as ScanReport;
    }
    return null;
  } catch (e) {
    console.error("Error reading report from MongoDB:", e);
    return null;
  }
}
