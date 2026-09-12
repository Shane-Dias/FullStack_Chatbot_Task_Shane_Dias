import { CreateEnquiryInput } from "../validators/enquiry.validator";
import { Priority } from "../models/Enquiry.model";

/**
 * Very simple, transparent heuristic lead scoring (0-100).
 * Not machine learning - just weighted signals that are easy to explain,
 * per the blueprint's "lead scoring" enhancement.
 */
export function computeLeadScore(input: CreateEnquiryInput): {
  score: number;
  priority: Priority;
} {
  let score = 30; // baseline for any submitted enquiry

  if (input.source === "Chatbot") score += 10; // engaged via conversation
  if (input.userType === "Student") score += 10; // course enrollment intent
  if (input.userType === "Customer") score += 15; // commercial intent

  if (input.message && input.message.length > 60) score += 10; // detailed message

  const highIntentKeywords = ["urgent", "asap", "book", "enroll", "register", "buy", "quote", "price"];
  const text = `${input.message} ${input.interest}`.toLowerCase();
  if (highIntentKeywords.some((k) => text.includes(k))) score += 15;

  if (input.conversation && input.conversation.length > 4) score += 10; // sustained engagement

  score = Math.max(0, Math.min(100, score));

  let priority: Priority = "Normal";
  if (score >= 65) priority = "High";
  else if (score < 35) priority = "Low";

  return { score, priority };
}
