import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

const BCRYPT_SALT_ROUNDS = 12;

export interface TokenPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

/**
 * Hashes a plaintext password using bcrypt (12 rounds)
 */
export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
}

/**
 * Compares a plaintext password against a bcrypt hash
 */
export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/**
 * Hashes a token using SHA-256 before storing in MongoDB
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Signs a short-lived access token
 */
export function signAccessToken(userId: string): string {
  return jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY as any,
  });
}

/**
 * Signs a long-lived refresh token
 */
export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId, jti: crypto.randomUUID() }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY as any,
  });
}

/**
 * Verifies an access token
 */
export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Access token has expired', 'ACCESS_TOKEN_EXPIRED');
    }
    throw new ApiError(401, 'Invalid access token', 'INVALID_ACCESS_TOKEN');
  }
}

/**
 * Verifies a refresh token
 */
export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Refresh token has expired', 'REFRESH_TOKEN_EXPIRED');
    }
    throw new ApiError(401, 'Invalid refresh token', 'INVALID_REFRESH_TOKEN');
  }
}
