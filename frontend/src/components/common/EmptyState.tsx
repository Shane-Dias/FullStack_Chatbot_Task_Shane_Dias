import { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-navy-600 bg-navy-800/30 px-6 py-14 text-center">
      <div className="rounded-full bg-navy-700/50 p-3 text-slate-500">{icon ?? <Inbox className="h-6 w-6" />}</div>
      <h3 className="text-base font-semibold text-slate-200">{title}</h3>
      {description && <p className="max-w-sm text-sm text-slate-400">{description}</p>}
      {action}
    </div>
  );
}
