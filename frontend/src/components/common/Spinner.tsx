import { Loader2 } from "lucide-react";

export function Spinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-slate-400">
      <Loader2 className="h-6 w-6 animate-spin text-accent" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
