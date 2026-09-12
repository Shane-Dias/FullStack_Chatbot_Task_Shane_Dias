import { Users, Inbox, AlertTriangle, CalendarClock } from "lucide-react";
import { DashboardStats } from "../../types/enquiry";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: "Total Enquiries", value: stats.total, icon: Inbox, color: "text-accent" },
    { label: "New Leads", value: stats.newLeads, icon: Users, color: "text-blue-400" },
    { label: "High Priority", value: stats.highPriority, icon: AlertTriangle, color: "text-red-400" },
    { label: "This Week", value: stats.thisWeek, icon: CalendarClock, color: "text-amber-400" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="card flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-100">{c.value}</p>
          </div>
          <c.icon className={`h-8 w-8 ${c.color}`} />
        </div>
      ))}
    </div>
  );
}
