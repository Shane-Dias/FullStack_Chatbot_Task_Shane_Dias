import { z } from "zod";

const conversationEntrySchema = z.object({
  sender: z.enum(["user", "bot"]),
  text: z.string().min(1).max(2000),
  timestamp: z.coerce.date().optional(),
});

// Same rules the frontend mirrors via zodResolver - backend is the source of truth.
export const createEnquirySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email format"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  userType: z.enum(["Student", "Customer", "Other"], {
    required_error: "User type is required",
    invalid_type_error: "userType must be Student, Customer or Other",
  }),
  interest: z
    .string({ required_error: "Interest / service of interest is required" })
    .trim()
    .min(2, "Interest must be at least 2 characters")
    .max(200, "Interest must be at most 200 characters"),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(2, "Message must be at least 2 characters")
    .max(1000, "Message must be at most 1000 characters"),
  source: z.enum(["Chatbot", "Contact Form", "Website"]).optional(),
  conversation: z.array(conversationEntrySchema).optional(),
});

export const updateEnquirySchema = z
  .object({
    status: z.enum(["New", "Contacted", "In Progress", "Closed"]).optional(),
    priority: z.enum(["Low", "Normal", "High"]).optional(),
    adminNotes: z.string().max(2000).optional(),
    name: z.string().trim().min(2).max(100).optional(),
    email: z.string().trim().email("Invalid email format").optional(),
    phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number").optional(),
    userType: z.enum(["Student", "Customer", "Other"]).optional(),
    interest: z.string().trim().min(2).max(200).optional(),
    message: z.string().trim().min(2).max(1000).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
  });

export type CreateEnquiryInput = z.infer<typeof createEnquirySchema>;
export type UpdateEnquiryInput = z.infer<typeof updateEnquirySchema>;
