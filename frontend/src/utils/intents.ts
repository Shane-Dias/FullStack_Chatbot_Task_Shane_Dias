import { Intent } from "../types/chat";
import { SERVICES, COURSES } from "./siteContent";

const serviceNames = SERVICES.map((s) => s.title).join(", ");
const courseNames = COURSES.map((c) => c.title).join(", ");

export const INTENTS: Intent[] = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "greetings", "start"],
    synonyms: ["good morning", "good afternoon", "good evening"],
    response:
      "Hi there! 👋 I'm the DroneTV Assistant. I can tell you about our services, courses, or help you get in touch with our team. What would you like to know?",
    followUp: ["Our services", "Our courses", "Contact DroneTV", "I want to register"],
  },
  {
    id: "ask_services",
    keywords: ["service", "services", "offer", "provide", "do", "solutions"],
    synonyms: ["what do you do", "help with", "what can dronetv do"],
    response: `DroneTV offers: ${serviceNames}. Would you like to enquire about any of these?`,
    followUp: ["I'm interested in a service", "Tell me about courses instead"],
    triggersLeadFlow: false,
  },
  {
    id: "ask_courses",
    keywords: ["course", "courses", "training", "learn", "class", "certification", "program", "programme"],
    synonyms: ["how do i learn to fly", "drone school"],
    response: `We offer the following training programmes: ${courseNames}. Want to know more, or register your interest?`,
    followUp: ["I'm a student", "How can I register?"],
  },
  {
    id: "ask_contact",
    keywords: ["contact", "reach", "email", "phone", "address", "location", "call"],
    synonyms: ["how do i contact you", "get in touch"],
    response:
      "You can reach DroneTV via the Contact page on this site, or I can pass your details directly to our team right now — just say 'I want to speak with someone' and I'll take your details.",
    followUp: ["I want to speak with someone", "Our services"],
  },
  {
    id: "ask_register",
    keywords: ["register", "registration", "enroll", "enrol", "sign", "signup", "join"],
    synonyms: ["how can i register", "how do i sign up"],
    response:
      "Great! I just need a few details from you to get you registered. Let's get started! 🚀",
    followUp: ["Tell me about courses first", "Our services"],
    triggersLeadFlow: true,
  },
  {
    id: "affirmative",
    keywords: ["yes", "sure", "okay", "ok", "yep", "yeah", "go", "start"],
    synonyms: ["yes please", "yes let's start", "let's go", "go ahead", "sounds good"],
    response: "Great — let me take a few details from you.",
    triggersLeadFlow: true,
  },
  {
    id: "interested_service",
    keywords: ["interested", "service", "enquire", "quote", "pricing", "price", "cost"],
    synonyms: ["i want a service", "i need drone services", "i am interested in a service"],
    response:
      "Awesome — I'd love to connect you with our services team. Which service are you interested in?",
    followUp: SERVICES.slice(0, 4).map((s) => s.title),
    triggersLeadFlow: true,
  },
  {
    id: "is_student",
    keywords: ["student", "studying", "school", "college"],
    synonyms: ["i am a student", "i'm a student"],
    response:
      "Welcome! We have training programmes for all levels, from beginner piloting to advanced certification. Would you like me to note your details so our training team can reach out with the best fit?",
    followUp: ["Yes, please", "Tell me about courses first"],
    triggersLeadFlow: true,
  },
  {
    id: "speak_to_human",
    keywords: ["speak", "human", "someone", "representative", "agent", "person", "talk"],
    synonyms: ["i want to speak with someone", "connect me to a person", "talk to a human"],
    response:
      "Of course — let me collect a few details so a member of the DroneTV team can reach out to you directly.",
    triggersLeadFlow: true,
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank", "great", "awesome", "cool", "nice"],
    response: "You're welcome! Is there anything else I can help you with?",
    followUp: ["Our services", "Our courses", "I want to speak with someone"],
  },
  {
    id: "goodbye",
    keywords: ["bye", "goodbye", "later", "exit"],
    response: "Thanks for chatting with DroneTV! Have a great day. 👋",
  },
];

export const FALLBACK_QUICK_REPLIES = [
  "What services does DroneTV provide?",
  "What courses are available?",
  "How can I contact DroneTV?",
  "I want to speak with someone",
];
