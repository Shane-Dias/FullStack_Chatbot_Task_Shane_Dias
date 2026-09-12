import { Map, Sprout, ScanEye, Clapperboard, Cpu, ClipboardList, HelpCircle, LucideProps } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Map,
  Sprout,
  ScanEye,
  Clapperboard,
  Cpu,
  ClipboardList,
};

export function ServiceIcon({ name, ...rest }: { name: string } & LucideProps) {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent {...rest} />;
}
