import { useState } from "react";
import { EnquiryFilters, Enquiry } from "../types/enquiry";
import { useEnquiriesList } from "../hooks/useEnquiries";
import { useDashboardStats } from "../hooks/useEnquiries";
import { StatsCards } from "../components/dashboard/StatsCards";
import { FiltersBar } from "../components/dashboard/FiltersBar";
import { EnquiryTable } from "../components/dashboard/EnquiryTable";
import { EnquiryDetailsDrawer } from "../components/dashboard/EnquiryDetailsDrawer";

const DEFAULT_FILTERS: EnquiryFilters = { status: "", userType: "", priority: "", search: "", page: 1, limit: 10 };

export function AdminDashboardPage() {
  const [filters, setFilters] = useState<EnquiryFilters>(DEFAULT_FILTERS);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const { data: statsData } = useDashboardStats();
  const { data, isLoading, isError, error } = useEnquiriesList(filters);

  const hasActiveFilters = !!(filters.status || filters.userType || filters.priority || filters.search);
  const totalPages = data?.meta?.totalPages ?? 1;
  const currentPage = data?.meta?.page ?? 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Enquiries Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Manage incoming leads from the website and chatbot.</p>
      </div>

      {statsData && (
        <StatsCards
          stats={statsData}
          onHighPriorityClick={() =>
            setFilters((f) => ({
              ...f,
              priority: f.priority === "High" ? "" : "High",
              page: 1,
            }))
          }
        />
      )}

      <div className="card space-y-4">
        <FiltersBar filters={filters} onChange={setFilters} />

        {isError && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error instanceof Error ? error.message : "Failed to load enquiries."}
          </div>
        )}

        <EnquiryTable
          enquiries={data?.items ?? []}
          isLoading={isLoading}
          onRowClick={setSelectedEnquiry}
          onClearFilters={() => setFilters(DEFAULT_FILTERS)}
          hasActiveFilters={hasActiveFilters}
        />

        {!isLoading && (data?.items.length ?? 0) > 0 && (
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>
              Page {currentPage} of {totalPages} · {data?.meta?.total ?? 0} total
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) - 1 }))}
                className="btn-secondary !px-3 !py-1.5 text-xs disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setFilters((f) => ({ ...f, page: (f.page ?? 1) + 1 }))}
                className="btn-secondary !px-3 !py-1.5 text-xs disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <EnquiryDetailsDrawer
        enquiry={selectedEnquiry ? (data?.items.find((e) => e._id === selectedEnquiry._id) ?? selectedEnquiry) : null}
        onClose={() => setSelectedEnquiry(null)}
      />
    </div>
  );
}
