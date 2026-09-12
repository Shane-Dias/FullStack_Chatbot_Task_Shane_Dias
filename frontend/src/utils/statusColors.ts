import { EnquiryStatus, Priority } from "../types/enquiry";

export const STATUS_STYLES: Record<EnquiryStatus, string> = {
  New: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Contacted: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "In Progress": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Closed: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export const PRIORITY_STYLES: Record<Priority, string> = {
  High: "bg-red-500/15 text-red-400 border-red-500/30",
  Normal: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Low: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

export const STATUS_OPTIONS: EnquiryStatus[] = ["New", "Contacted", "In Progress", "Closed"];
