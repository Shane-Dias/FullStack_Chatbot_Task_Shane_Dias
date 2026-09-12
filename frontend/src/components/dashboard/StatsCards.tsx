import { Users, Inbox, AlertTriangle, CalendarClock } from "lucide-react";
import { DashboardStats } from "../../types/enquiry";

interface StatsCardsProps {
  stats: DashboardStats;
  onHighPriorityClick?: () => void;
}

export function StatsCards({ stats, onHighPriorityClick }: StatsCardsProps) {
  const cards = [
    { label: "Total Enquiries", value: stats.total, icon: Inbox, color: "text-accent", onClick: undefined },
    { label: "New Leads", value: stats.newLeads, icon: Users, color: "text-blue-400", onClick: undefined },
    {
      label: "High Priority",
      value: stats.highPriority,
      icon: AlertTriangle,
      color: "text-red-400",
      onClick: onHighPriorityClick,
    },
    { label: "This Week", value: stats.thisWeek, icon: CalendarClock, color: "text-amber-400", onClick: undefined },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) =>
        c.onClick ? (
          <button
            key={c.label}
            onClick={c.onClick}
            className="card flex items-center justify-between text-left transition hover:border-red-500/40 hover:bg-red-500/5 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2 focus:ring-offset-navy-950"
          >
            <div>
              <p className="text-sm text-slate-400">{c.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-100">{c.value}</p>
              <p className="mt-0.5 text-xs text-slate-500">Click to filter</p>
            </div>
            <c.icon className={`h-8 w-8 ${c.color}`} />
          </button>
        ) : (
          <div key={c.label} className="card flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">{c.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-100">{c.value}</p>
            </div>
            <c.icon className={`h-8 w-8 ${c.color}`} />
          </div>
        )
      )}
    </div>
  );
}
