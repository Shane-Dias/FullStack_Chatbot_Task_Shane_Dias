import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { ApiError, FieldError } from "../utils/ApiError";

/**
 * Runs the given Zod schema against req.body. On failure, responds 400
 * with field-level errors before the request ever reaches the controller
 * or touches the database. On success, req.body is replaced with the
 * parsed (trimmed/coerced) value.
 */
export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors: FieldError[] = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      }));
      return next(ApiError.badRequest("Validation failed", errors));
    }

    req.body = result.data;
    next();
  };
}
