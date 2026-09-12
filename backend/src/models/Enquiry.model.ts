import { Schema, model, Document, Types } from "mongoose";

export type UserType = "Student" | "Customer" | "Other";
export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";
export type EnquirySource = "Chatbot" | "Contact Form" | "Website";
export type Priority = "Low" | "Normal" | "High";

export interface ConversationEntry {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface IEnquiry extends Document {
  _id: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

const conversationEntrySchema = new Schema<ConversationEntry>(
  {
    sender: { type: String, enum: ["user", "bot"], required: true },
    text: { type: String, required: true, trim: true, maxlength: 2000 },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts optional leading +, optional country code, 10-15 digits total
const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

const enquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be at most 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [EMAIL_REGEX, "Invalid email format"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [PHONE_REGEX, "Invalid phone number"],
    },
    userType: {
      type: String,
      enum: {
        values: ["Student", "Customer", "Other"],
        message: "userType must be Student, Customer or Other",
      },
      required: [true, "User type is required"],
    },
    interest: {
      type: String,
      required: [true, "Interest / service of interest is required"],
      trim: true,
      maxlength: [200, "Interest must be at most 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message must be at most 1000 characters"],
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
    source: {
      type: String,
      enum: ["Chatbot", "Contact Form", "Website"],
      default: "Website",
    },
    priority: {
      type: String,
      enum: ["Low", "Normal", "High"],
      default: "Normal",
    },
    leadScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    conversation: {
      type: [conversationEntrySchema],
      default: [],
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
  },
  { timestamps: true }
);

enquirySchema.index({ email: 1 });
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ name: "text", email: "text", interest: "text" });

export const Enquiry = model<IEnquiry>("Enquiry", enquirySchema);
