import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        ...(err.details ? { details: err.details } : {}),
      },
    });
    return;
  }

  // Handle Mongoose duplicate key error (11000)
  if ((err as any).code === 11000) {
    res.status(409).json({
      success: false,
      error: {
        message: 'An account with this email already exists',
        code: 'EMAIL_ALREADY_EXISTS',
      },
    });
    return;
  }

  // Unknown/Internal Error
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
}
