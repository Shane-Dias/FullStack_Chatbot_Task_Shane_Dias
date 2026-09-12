import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError, FieldError } from "../utils/ApiError";
import { env } from "../config/env";

/**
 * Single place where every error in the app is mapped to a status code
 * and a safe, human-readable message. Full details are always logged
 * server-side; only sanitized info ever reaches the client.
 */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = 500;
  let message = "Something went wrong. Please try again later.";
  let errors: FieldError[] | undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid enquiry ID";
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  } else if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: unknown }).code === 11000
  ) {
    statusCode = 409;
    message = "A record with these details already exists";
  }

  // Full error always logged server-side, never sent to the client.
  console.error(`[error] ${req.method} ${req.originalUrl} ->`, err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
    ...(env.isProduction ? {} : { stackHint: statusCode === 500 ? String(err) : undefined }),
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
