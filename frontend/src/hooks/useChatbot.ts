import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessage, ConversationContext, ChatFlow } from "../types/chat";
import { resolveIntent, getIntentId } from "../services/chatbotEngine";
import { submitEnquiry } from "../services/enquiryService";
import { EnquiryDraft, UserType } from "../types/enquiry";
import toast from "react-hot-toast";

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const GREETING: ChatMessage = {
  id: makeId(),
  sender: "bot",
  text: "Hi there! 👋 I'm the DroneTV Assistant. I can tell you about our services, courses, or help you get in touch with our team. What would you like to know?",
  timestamp: new Date().toISOString(),
  quickReplies: ["Our services", "Our courses", "Contact DroneTV", "I want to register"],
};

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [currentFlow, setCurrentFlow] = useState<ChatFlow>("idle");
  const [collectedLeadInfo, setCollectedLeadInfo] = useState<{
    interest?: string;
    userType?: UserType;
  }>({});
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consecutiveFallbackCount, setConsecutiveFallbackCount] = useState(0);

  // Ref so the setTimeout callback always reads the latest currentFlow value
  const currentFlowRef = useRef<ChatFlow>(currentFlow);
  useEffect(() => {
    currentFlowRef.current = currentFlow;
  }, [currentFlow]);

  const pushMessage = useCallback((msg: Omit<ChatMessage, "id" | "timestamp">) => {
    setMessages((prev) => [...prev, { ...msg, id: makeId(), timestamp: new Date().toISOString() }]);
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      pushMessage({ sender: "user", text: trimmed });

      const context: ConversationContext = {
        messages,
        collectedLeadInfo,
        currentFlow: currentFlowRef.current,
        consecutiveFallbackCount,
      };

      setIsTyping(true);
      window.setTimeout(() => {
        const reply = resolveIntent(trimmed, context);
        pushMessage({ sender: "bot", text: reply.text, quickReplies: reply.quickReplies });

        // Detect fallback (no matching intent)
        const intentId = getIntentId(trimmed);
        if (!intentId) {
          setConsecutiveFallbackCount((c) => c + 1);
        } else {
          setConsecutiveFallbackCount(0);
        }

        if (reply.triggersLeadFlow && currentFlowRef.current === "idle") {
          setCurrentFlow("collecting_contact_info");
        }
        setIsTyping(false);
      }, 500);
    },
    [messages, collectedLeadInfo, consecutiveFallbackCount, pushMessage]
  );

  const submitLead = useCallback(
    async (info: { name: string; email: string; phone: string; userType: UserType; interest: string; message: string }) => {
      setIsSubmitting(true);
      try {
        const draft: EnquiryDraft = {
          ...info,
          source: "Chatbot",
          conversation: messages.map((m) => ({
            sender: m.sender,
            text: m.text,
            timestamp: m.timestamp,
          })),
        };
        await submitEnquiry(draft);
        pushMessage({
          sender: "bot",
          text: `Thanks, ${info.name}! Your enquiry has been received. Our team will reach out to you shortly at ${info.email}.`,
          quickReplies: ["Our services", "Our courses", "Contact DroneTV"],
        });
        toast.success("Enquiry submitted successfully!");
        setCurrentFlow("idle");
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        toast.error(message);
        pushMessage({
          sender: "bot",
          text: "Sorry, something went wrong submitting your enquiry. Please try again or use the Contact page.",
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [messages, pushMessage]
  );

  const cancelLeadFlow = useCallback(() => {
    pushMessage({
      sender: "bot",
      text: "No problem! Feel free to explore more or come back when you're ready. 😊",
      quickReplies: ["Our services", "Our courses", "I want to register"],
    });
    setCurrentFlow("idle");
  }, [pushMessage]);

  const resetConversation = useCallback(() => {
    setMessages([{ ...GREETING, id: makeId(), timestamp: new Date().toISOString() }]);
    setCurrentFlow("idle");
    setCollectedLeadInfo({});
    setConsecutiveFallbackCount(0);
  }, []);

  return {
    messages,
    isTyping,
    isSubmitting,
    currentFlow,
    sendMessage,
    submitLead,
    cancelLeadFlow,
    resetConversation,
    setCollectedLeadInfo,
  };
}
