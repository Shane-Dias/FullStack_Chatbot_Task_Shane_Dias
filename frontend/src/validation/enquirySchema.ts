import { z } from "zod";

// Mirrors backend/src/validators/enquiry.validator.ts exactly.
// Frontend validation is UX only - the backend is the real source of truth.
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number (10-15 digits)"),
  userType: z.enum(["Student", "Customer", "Other"], {
    errorMap: () => ({ message: "Please select an option" }),
  }),
  interest: z
    .string()
    .trim()
    .min(2, "Tell us what you're interested in")
    .max(200, "Keep this under 200 characters"),
  message: z
    .string()
    .trim()
    .min(2, "Please add a short message")
    .max(1000, "Keep this under 1000 characters"),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
