import { INTENTS, FALLBACK_QUICK_REPLIES } from "../utils/intents";
import { BotReply, ConversationContext } from "../types/chat";
import { normalize, isFuzzyMatch } from "../utils/stringSimilarity";

const CONFIDENCE_THRESHOLD = 1; // at least one solid keyword/synonym hit required

/**
 * Scores every intent against the normalized message using simple token
 * overlap (keywords + synonym phrases), with fuzzy matching for typos.
 * This avoids a brittle chain of `if (message.includes(...))` checks and
 * means paraphrased questions still resolve to the right intent.
 */
function scoreIntent(tokens: string[], normalizedMessage: string, intent: (typeof INTENTS)[number]): number {
  let score = 0;

  for (const keyword of intent.keywords) {
    const kw = keyword.toLowerCase();
    if (tokens.some((t) => t === kw || isFuzzyMatch(t, kw))) {
      score += 1;
    }
  }

  for (const phrase of intent.synonyms ?? []) {
    if (normalizedMessage.includes(phrase.toLowerCase())) {
      score += 2; // full phrase match is a stronger signal than a single keyword
    }
  }

  return score;
}

/**
 * Single entry point for intent resolution. Because everything routes
 * through this one function, swapping in a real LLM later only requires
 * changing this file - nothing in the UI or state management needs to move.
 */
export function resolveIntent(message: string, context: ConversationContext): BotReply {
  const normalized = normalize(message);
  const tokens = normalized.split(" ").filter(Boolean);

  let bestIntent: (typeof INTENTS)[number] | null = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    const score = scoreIntent(tokens, normalized, intent);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (!bestIntent || bestScore < CONFIDENCE_THRESHOLD) {
    return {
      text:
        "I'm not sure I understood that. Here are a few things I can help with — or try rephrasing your question:",
      quickReplies: FALLBACK_QUICK_REPLIES,
    };
  }

  const responseText =
    typeof bestIntent.response === "function" ? bestIntent.response(context).text : bestIntent.response;

  return {
    text: responseText,
    quickReplies: bestIntent.followUp,
    triggersLeadFlow: bestIntent.triggersLeadFlow,
  };
}

export function getIntentId(message: string): string | undefined {
  const normalized = normalize(message);
  const tokens = normalized.split(" ").filter(Boolean);
  let bestIntent: (typeof INTENTS)[number] | null = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    const score = scoreIntent(tokens, normalized, intent);
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }
  return bestScore >= CONFIDENCE_THRESHOLD ? bestIntent?.id : undefined;
}
