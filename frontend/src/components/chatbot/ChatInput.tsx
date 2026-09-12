import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-navy-700 p-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="input-field flex-1"
        aria-label="Chat message"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-navy-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
