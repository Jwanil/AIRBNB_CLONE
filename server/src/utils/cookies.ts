import { Response } from 'express';
import { env } from '../config/env.js';

const ACCESS_COOKIE_MAX_AGE = 15 * 60 * 1000; // 15 minutes in ms
const REFRESH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  const isProd = env.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: ACCESS_COOKIE_MAX_AGE,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
    maxAge: REFRESH_COOKIE_MAX_AGE,
  });
}

export function clearAuthCookies(res: Response): void {
  const isProd = env.NODE_ENV === 'production';

  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
  });
}
