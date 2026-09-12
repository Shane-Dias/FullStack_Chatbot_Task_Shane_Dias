import { NextFunction, Request, Response } from "express";

type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Wraps an async Express controller so rejected promises / thrown errors
 * are forwarded to next(err) instead of crashing the process or hanging
 * the request. This keeps controllers free of repetitive try/catch blocks.
 */
export function asyncHandler(fn: AsyncFn) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
