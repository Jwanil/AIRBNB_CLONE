import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
} from '../services/auth.service.js';
import { setAuthCookies, clearAuthCookies } from '../utils/cookies.js';
import { ApiError } from '../utils/ApiError.js';
import { RegisterInput, LoginInput } from '../schemas/auth.schema.js';

const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function register(
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, 'An account with this email already exists', 'EMAIL_ALREADY_EXISTS');
    }

    const user = new User({
      name,
      email,
      password,
      refreshTokens: [],
    });

    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString());
    const tokenHash = hashToken(refreshToken);

    user.refreshTokens.push({
      tokenHash,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
    });

    await user.save();
    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({
      success: true,
      data: {
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;

    // Must explicitly select +password since it is excluded by default
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      // Generic message to prevent email enumeration
      throw new ApiError(401, 'Invalid email or password', 'AUTH_INVALID_CREDENTIALS');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password', 'AUTH_INVALID_CREDENTIALS');
    }

    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString());
    const tokenHash = hashToken(refreshToken);

    // Filter out expired refresh tokens before saving
    const now = new Date();
    user.refreshTokens = user.refreshTokens.filter((t) => t.expiresAt > now);

    user.refreshTokens.push({
      tokenHash,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
    });

    await user.save();
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      data: {
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const oldRefreshToken = req.cookies?.refreshToken;
    if (!oldRefreshToken) {
      throw new ApiError(401, 'Refresh token required', 'REFRESH_TOKEN_REQUIRED');
    }

    const payload = verifyRefreshToken(oldRefreshToken);
    const oldTokenHash = hashToken(oldRefreshToken);

    const user = await User.findById(payload.sub);
    if (!user) {
      clearAuthCookies(res);
      throw new ApiError(401, 'User no longer exists', 'USER_NOT_FOUND');
    }

    const tokenIndex = user.refreshTokens.findIndex(
      (t) => t.tokenHash === oldTokenHash && t.expiresAt > new Date()
    );

    if (tokenIndex === -1) {
      // Token reuse or expired token detected — clear cookies
      clearAuthCookies(res);
      throw new ApiError(401, 'Invalid or expired refresh token', 'INVALID_REFRESH_TOKEN');
    }

    // Token rotation: remove old token
    user.refreshTokens.splice(tokenIndex, 1);

    // Issue new pair
    const newAccessToken = signAccessToken(user._id.toString());
    const newRefreshToken = signRefreshToken(user._id.toString());
    const newTokenHash = hashToken(newRefreshToken);

    user.refreshTokens.push({
      tokenHash: newTokenHash,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
    });

    await user.save();
    setAuthCookies(res, newAccessToken, newRefreshToken);

    res.status(200).json({
      success: true,
      data: {
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken);
        const tokenHash = hashToken(refreshToken);
        await User.updateOne(
          { _id: payload.sub },
          { $pull: { refreshTokens: { tokenHash } } }
        );
      } catch {
        // Even if token verification fails, we still want to clear cookies
      }
    }

    clearAuthCookies(res);

    res.status(200).json({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.userId) {
      throw new ApiError(401, 'Authentication required', 'AUTH_REQUIRED');
    }

    const user = await User.findById(req.userId);
    if (!user) {
      throw new ApiError(404, 'User not found', 'USER_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: {
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.userId) {
      throw new ApiError(401, 'Authentication required', 'AUTH_REQUIRED');
    }

    await User.findByIdAndUpdate(req.userId, {
      $set: { refreshTokens: [] },
    });

    clearAuthCookies(res);

    res.status(200).json({
      success: true,
      data: {
        message: 'Logged out from all devices',
      },
    });
  } catch (error) {
    next(error);
  }
}
