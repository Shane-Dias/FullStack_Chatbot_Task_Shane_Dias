import { Router } from "express";
import { login, logout, me } from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate.middleware";
import { loginSchema } from "../validators/auth.validator";
import { requireAdmin } from "../middleware/auth.middleware";
import { loginRateLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();

router.post("/login", loginRateLimiter, validateBody(loginSchema), login);
router.post("/logout", logout);
router.get("/me", requireAdmin, me);

export default router;
