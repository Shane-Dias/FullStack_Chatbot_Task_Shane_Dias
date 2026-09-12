import { useEffect, useRef, useState } from "react";
import { Bot, RotateCcw, X } from "lucide-react";
import { MessageBubble, TypingIndicator } from "./MessageBubble";
import { QuickReplies } from "./QuickReplies";
import { ChatInput } from "./ChatInput";
import { useChatbot } from "../../hooks/useChatbot";
import { Input, Select, Textarea } from "../common/FormFields";
import { Button } from "../common/Button";
import { UserType } from "../../types/enquiry";

interface ChatWindowProps {
  onClose?: () => void;
  embedded?: boolean; // true when rendered as a full page section, not a floating popup
}

export function ChatWindow({ onClose, embedded }: ChatWindowProps) {
  const { messages, isTyping, isSubmitting, currentFlow, sendMessage, submitLead, cancelLeadFlow, resetConversation } =
    useChatbot();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, currentFlow]);

  const lastBotMessage = [...messages].reverse().find((m) => m.sender === "bot");

  return (
    <div className={`flex ${embedded ? "h-[600px]" : "h-[70vh] max-h-[600px]"} flex-col rounded-xl border border-navy-700 bg-navy-800`}>
      <div className="flex items-center justify-between rounded-t-xl border-b border-navy-700 bg-navy-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
            <Bot className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100">DroneTV Assistant</p>
            <p className="text-xs text-green-400">● Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={resetConversation}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="rounded-lg p-2 text-slate-400 hover:bg-navy-700 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Close chat"
              aria-label="Close chat"
              className="rounded-lg p-2 text-slate-400 hover:bg-navy-700 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        {!isTyping && currentFlow === "idle" && lastBotMessage?.quickReplies && (
          <QuickReplies options={lastBotMessage.quickReplies} onSelect={sendMessage} />
        )}
      </div>

      {currentFlow === "collecting_contact_info" ? (
        <InlineLeadForm onCancel={cancelLeadFlow} onSubmit={submitLead} isSubmitting={isSubmitting} />
      ) : (
        <ChatInput onSend={sendMessage} disabled={isTyping} />
      )}
    </div>
  );
}

interface InlineLeadFormProps {
  onCancel: () => void;
  onSubmit: (info: {
    name: string;
    email: string;
    phone: string;
    userType: UserType;
    interest: string;
    message: string;
  }) => Promise<boolean>;
  isSubmitting: boolean;
}

function InlineLeadForm({ onCancel, onSubmit, isSubmitting }: InlineLeadFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "" as UserType | "",
    interest: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.email || !form.phone || !form.userType || !form.interest || !form.message) {
      setError("Please fill in all fields so our team can follow up.");
      return;
    }
    await onSubmit({ ...form, userType: form.userType as UserType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border-t border-navy-700 p-4">
      <p className="text-xs text-slate-400">Just need a few details to connect you with our team:</p>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="grid grid-cols-2 gap-2">
        <Input label="Name" required value={form.name} onChange={handleChange("name")} />
        <Input label="Phone" required value={form.phone} onChange={handleChange("phone")} />
      </div>
      <Input label="Email" type="email" required value={form.email} onChange={handleChange("email")} />
      <div className="grid grid-cols-2 gap-2">
        <Select
          label="I am a"
          required
          value={form.userType}
          onChange={handleChange("userType")}
          options={[
            { value: "Student", label: "Student" },
            { value: "Customer", label: "Customer" },
            { value: "Other", label: "Other" },
          ]}
        />
        <Input label="Interest" required value={form.interest} onChange={handleChange("interest")} placeholder="e.g. Aerial Survey" />
      </div>
      <Textarea label="Message" required value={form.message} onChange={handleChange("message")} placeholder="What can we help with?" />
      <div className="flex gap-2">
        <Button type="submit" isLoading={isSubmitting} className="flex-1">
          Submit
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
