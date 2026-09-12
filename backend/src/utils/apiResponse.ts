import { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  data: T,
  message = "Success",
  meta?: Record<string, unknown>
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
}
