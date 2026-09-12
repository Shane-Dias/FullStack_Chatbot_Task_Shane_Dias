import { Search, AlertTriangle, X } from "lucide-react";
import { EnquiryFilters } from "../../types/enquiry";
import { STATUS_OPTIONS } from "../../utils/statusColors";

interface FiltersBarProps {
  filters: EnquiryFilters;
  onChange: (filters: EnquiryFilters) => void;
}

export function FiltersBar({ filters, onChange }: FiltersBarProps) {
  const isHighPriority = filters.priority === "High";

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: search + status + user-type toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <input
            value={filters.search ?? ""}
            onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
            placeholder="Search by name, email, or interest..."
            className="input-field w-full pl-9 pr-8"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: "", page: 1 })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status */}
        <select
          value={filters.status ?? ""}
          onChange={(e) =>
            onChange({ ...filters, status: e.target.value as EnquiryFilters["status"], page: 1 })
          }
          className="input-field sm:w-44 shrink-0"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* User type */}
        <div className="flex overflow-hidden rounded-lg border border-navy-600 shrink-0">
          {(["", "Student", "Customer"] as const).map((ut) => (
            <button
              key={ut || "all"}
              onClick={() =>
                onChange({ ...filters, userType: ut as EnquiryFilters["userType"], page: 1 })
              }
              className={`px-3.5 py-2.5 text-sm font-medium transition ${
                (filters.userType ?? "") === ut
                  ? "bg-accent text-navy-950"
                  : "bg-navy-900 text-slate-300 hover:bg-navy-800"
              }`}
            >
              {ut || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2: priority quick-filter */}
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            onChange({ ...filters, priority: isHighPriority ? "" : "High", page: 1 })
          }
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
            isHighPriority
              ? "border-red-500/60 bg-red-500/20 text-red-400"
              : "border-navy-600 bg-navy-900 text-slate-400 hover:border-red-500/40 hover:text-red-400"
          }`}
        >
          <AlertTriangle className="h-3 w-3" />
          High Priority
          {isHighPriority && <X className="h-3 w-3 ml-0.5" />}
        </button>

        {(filters.search || filters.status || filters.userType || filters.priority) && (
          <span className="text-xs text-slate-500">
            Filters active
          </span>
        )}
      </div>
    </div>
  );
}
