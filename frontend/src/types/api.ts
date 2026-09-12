export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: FieldError[];
}

export class ApiRequestError extends Error {
  status: number;
  fieldErrors?: FieldError[];

  constructor(message: string, status: number, fieldErrors?: FieldError[]) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}
