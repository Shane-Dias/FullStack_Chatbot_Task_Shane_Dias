import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/apiResponse";
import { env } from "../config/env";

const COOKIE_NAME = "token";

function signToken(admin: { id: string; email: string; name: string }) {
  return jwt.sign(admin, env.jwtSecret, { expiresIn: env.jwtExpiresIn } as jwt.SignOptions);
}

function setAuthCookie(res: Response, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "strict",
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
  });
}

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+passwordHash");
  if (!admin) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const payload = { id: admin._id.toString(), email: admin.email, name: admin.name };
  const token = signToken(payload);
  setAuthCookie(res, token);

  sendSuccess(res, 200, payload, "Login successful");
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "strict",
  });
  sendSuccess(res, 200, null, "Logged out successfully");
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.admin) {
    throw ApiError.unauthorized("Not authenticated");
  }
  sendSuccess(res, 200, req.admin, "Current admin session");
});
