import { Router } from "express";
import { getDashboardStats } from "../controllers/enquiry.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/stats", requireAdmin, getDashboardStats);

export default router;
