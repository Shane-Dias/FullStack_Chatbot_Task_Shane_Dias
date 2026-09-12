import { Router } from "express";
import {
  getEnquiries,
  getEnquiry,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} from "../controllers/enquiry.controller";
import { validateBody } from "../middleware/validate.middleware";
import { createEnquirySchema, updateEnquirySchema } from "../validators/enquiry.validator";
import { requireAdmin } from "../middleware/auth.middleware";
import { enquiryRateLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();

// Public: anyone (chatbot / contact form) can submit an enquiry
router.post("/", enquiryRateLimiter, validateBody(createEnquirySchema), createEnquiry);

// Admin-only: viewing, updating, deleting enquiries
router.get("/", requireAdmin, getEnquiries);
router.get("/:id", requireAdmin, getEnquiry);
router.put("/:id", requireAdmin, validateBody(updateEnquirySchema), updateEnquiry);
router.patch("/:id", requireAdmin, validateBody(updateEnquirySchema), updateEnquiry);
router.delete("/:id", requireAdmin, deleteEnquiry);

export default router;
