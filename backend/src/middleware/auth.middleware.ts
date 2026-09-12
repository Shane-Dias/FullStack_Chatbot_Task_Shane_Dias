import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

/**
 * Reads the JWT from the HTTP-only cookie, verifies it, and attaches
 * the decoded admin identity to req.admin. Protected routes (enquiry
 * list/detail/patch/delete) sit behind this middleware.
 */
export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    return next(ApiError.unauthorized("Authentication required"));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
    req.admin = { id: decoded.id, email: decoded.email, name: decoded.name };
    next();
  } catch {
    return next(ApiError.unauthorized("Invalid or expired session"));
  }
}
