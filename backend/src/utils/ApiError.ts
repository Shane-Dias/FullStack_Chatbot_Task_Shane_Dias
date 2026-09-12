export interface FieldError {
  field: string;
  message: string;
}

/**
 * Custom application error. Thrown anywhere in the request lifecycle and
 * caught by errorHandler.middleware.ts, which maps it to a safe JSON response.
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: FieldError[];
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, errors?: FieldError[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message = "Bad request", errors?: FieldError[]) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  static tooManyRequests(message = "Too many requests, please try again later") {
    return new ApiError(429, message);
  }

  static internal(message = "Something went wrong. Please try again later.") {
    return new ApiError(500, message);
  }
}
