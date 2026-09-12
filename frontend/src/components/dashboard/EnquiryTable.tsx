import { Enquiry } from "../../types/enquiry";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "../../utils/formatDate";
import { EmptyState } from "../common/EmptyState";
import { Inbox } from "lucide-react";

interface EnquiryTableProps {
  enquiries: Enquiry[];
  isLoading: boolean;
  onRowClick: (enquiry: Enquiry) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const COLUMNS = ["Name", "Email", "User Type", "Interest", "Status", "Date"];

export function EnquiryTable({ enquiries, isLoading, onRowClick, onClearFilters, hasActiveFilters }: EnquiryTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-navy-700">
        <table className="w-full text-sm">
          <thead className="bg-navy-800 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              {COLUMNS.map((c) => (
                <th key={c} className="px-4 py-3 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-t border-navy-700">
                {COLUMNS.map((c) => (
                  <td key={c} className="px-4 py-4">
                    <div className="h-3.5 w-24 animate-pulse rounded bg-navy-700" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (enquiries.length === 0) {
    return (
      <EmptyState
        icon={<Inbox className="h-6 w-6" />}
        title={hasActiveFilters ? "No results match your filters" : "No enquiries yet"}
        description={
          hasActiveFilters
            ? "Try adjusting or clearing your search/filter criteria."
            : "New enquiries from the website and chatbot will appear here."
        }
        action={
          hasActiveFilters ? (
            <button onClick={onClearFilters} className="btn-secondary !py-2 text-sm">
              Clear filters
            </button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-navy-700">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-navy-800 text-left text-xs uppercase tracking-wide text-slate-400">
          <tr>
            {COLUMNS.map((c) => (
              <th key={c} className="px-4 py-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr
              key={enquiry._id}
              onClick={() => onRowClick(enquiry)}
              className="cursor-pointer border-t border-navy-700 transition hover:bg-navy-800/60"
            >
              <td className="px-4 py-3.5 font-medium text-slate-200">{enquiry.name}</td>
              <td className="px-4 py-3.5 text-slate-400">{enquiry.email}</td>
              <td className="px-4 py-3.5 text-slate-400">{enquiry.userType}</td>
              <td className="max-w-[200px] truncate px-4 py-3.5 text-slate-400">{enquiry.interest}</td>
              <td className="px-4 py-3.5">
                <StatusBadge status={enquiry.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3.5 text-slate-400">{formatDate(enquiry.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
