import { ChatWindow } from "../components/chatbot/ChatWindow";

export function ChatbotPage() {
  return (
    <div className="section-container py-16">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">Chat with DroneTV</h1>
        <p className="mt-3 text-slate-400">
          Ask about our services, training programmes, or how to get in touch — our assistant is here to help,
          24/7.
        </p>
      </div>
      <div className="mx-auto max-w-xl">
        <ChatWindow embedded />
      </div>
    </div>
  );
}
