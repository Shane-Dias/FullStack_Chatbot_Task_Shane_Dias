export type UserType = "Student" | "Customer" | "Other";
export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";
export type EnquirySource = "Chatbot" | "Contact Form" | "Website";
export type Priority = "Low" | "Normal" | "High";

export interface ConversationEntry {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  source: EnquirySource;
  priority: Priority;
  leadScore: number;
  conversation: ConversationEntry[];
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryDraft {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  source?: EnquirySource;
  conversation?: ConversationEntry[];
}

export interface EnquiryFilters {
  status?: EnquiryStatus | "";
  userType?: UserType | "";
  priority?: Priority | "";
  search?: string;
  page?: number;
  limit?: number;
}

export interface DashboardStats {
  total: number;
  newLeads: number;
  highPriority: number;
  thisWeek: number;
  statusFunnel: Record<string, number>;
  userTypeSplit: Record<string, number>;
  topInterests: { interest: string; count: number }[];
}
