import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "./ChatWindow";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-navy-950 shadow-lg shadow-accent/30 transition hover:scale-105 hover:bg-sky-400 sm:bottom-6 sm:right-6"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm sm:right-6">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
