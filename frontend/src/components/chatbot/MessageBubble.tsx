import { ChatMessage } from "../../types/chat";
import { Bot, User } from "lucide-react";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.sender === "bot";

  return (
    <div className={`flex items-end gap-2 ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isBot
            ? "rounded-bl-sm bg-navy-700 text-slate-100"
            : "rounded-br-sm bg-accent text-navy-950"
        }`}
      >
        {message.text}
      </div>
      {!isBot && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-600 text-slate-300">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-navy-700 px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
      </div>
    </div>
  );
}
