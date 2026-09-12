import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import { env } from "./config/env";
import enquiryRoutes from "./routes/enquiry.routes";
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.middleware";

const app = express();

// --- Security & parsing middleware ---
app.use(helmet());
app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize()); // strips $ and . from req.body/query/params keys

// --- Health check ---
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "DroneTV API is running", data: { uptime: process.uptime() } });
});

// --- Routes ---
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --- 404 + centralized error handler (must be last) ---
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
