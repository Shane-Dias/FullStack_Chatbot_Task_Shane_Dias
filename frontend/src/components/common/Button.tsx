import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-navy-950 disabled:cursor-not-allowed disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-navy-700/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50",
};

export function Button({ children, variant = "primary", isLoading, className = "", disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={`${VARIANT_CLASSES[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
