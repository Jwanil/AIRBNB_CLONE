export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(statusCode: number, message: string, code: string = 'INTERNAL_ERROR', details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, code: string = 'BAD_REQUEST', details?: unknown): ApiError {
    return new ApiError(400, message, code, details);
  }

  static unauthorized(message: string, code: string = 'UNAUTHORIZED'): ApiError {
    return new ApiError(401, message, code);
  }

  static forbidden(message: string, code: string = 'FORBIDDEN'): ApiError {
    return new ApiError(403, message, code);
  }

  static notFound(message: string, code: string = 'NOT_FOUND'): ApiError {
    return new ApiError(404, message, code);
  }

  static conflict(message: string, code: string = 'CONFLICT'): ApiError {
    return new ApiError(409, message, code);
  }

  static unprocessable(message: string, code: string = 'VALIDATION_ERROR', details?: unknown): ApiError {
    return new ApiError(422, message, code, details);
  }

  static internal(message: string = 'Internal server error', code: string = 'INTERNAL_ERROR'): ApiError {
    return new ApiError(500, message, code);
  }
}
