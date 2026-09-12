import { Search } from "lucide-react";
import { EnquiryFilters } from "../../types/enquiry";
import { STATUS_OPTIONS } from "../../utils/statusColors";

interface FiltersBarProps {
  filters: EnquiryFilters;
  onChange: (filters: EnquiryFilters) => void;
}

export function FiltersBar({ filters, onChange }: FiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          value={filters.search ?? ""}
          onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
          placeholder="Search by name, email, or interest..."
          className="input-field pl-9"
        />
      </div>

      <select
        value={filters.status ?? ""}
        onChange={(e) => onChange({ ...filters, status: e.target.value as EnquiryFilters["status"], page: 1 })}
        className="input-field sm:w-44"
      >
        <option value="">All Statuses</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="flex overflow-hidden rounded-lg border border-navy-600">
        {(["", "Student", "Customer"] as const).map((ut) => (
          <button
            key={ut || "all"}
            onClick={() => onChange({ ...filters, userType: ut as EnquiryFilters["userType"], page: 1 })}
            className={`px-3.5 py-2.5 text-sm font-medium transition ${
              (filters.userType ?? "") === ut ? "bg-accent text-navy-950" : "bg-navy-900 text-slate-300 hover:bg-navy-800"
            }`}
          >
            {ut || "All"}
          </button>
        ))}
      </div>
    </div>
  );
}
