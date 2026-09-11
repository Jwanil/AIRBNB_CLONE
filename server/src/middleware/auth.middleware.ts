import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/auth.service.js';
import { ApiError } from '../utils/ApiError.js';

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new ApiError(401, 'Authentication required', 'AUTH_REQUIRED'));
  }

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.sub;
    next();
  } catch (error) {
    next(error);
  }
}
