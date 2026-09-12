interface QuickRepliesProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

export function QuickReplies({ options, onSelect, disabled }: QuickRepliesProps) {
  if (!options.length) return null;

  return (
    <div className="flex flex-wrap gap-2 pl-9">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
