export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

export type ChatFlow = "idle" | "qualifying" | "collecting_contact_info";

export interface ConversationContext {
  messages: ChatMessage[];
  collectedLeadInfo: {
    interest?: string;
    userType?: import("./enquiry").UserType;
  };
  currentFlow: ChatFlow;
  lastIntentId?: string;
}

export interface BotReply {
  text: string;
  quickReplies?: string[];
  triggersLeadFlow?: boolean;
}

export interface Intent {
  id: string;
  keywords: string[];
  synonyms?: string[];
  response: string | ((ctx: ConversationContext) => BotReply);
  followUp?: string[];
  triggersLeadFlow?: boolean;
}
