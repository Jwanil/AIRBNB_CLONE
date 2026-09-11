import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { ApiError } from './utils/ApiError.js';

export const app: Express = express();

// Security headers
app.use(helmet());

// CORS configuration (scoped to exact frontend origin, credentials enabled)
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body and cookie parsing
app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);

// Catch-all 404 for unhandled routes
app.use((req: Request, _res: Response, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`, 'ROUTE_NOT_FOUND'));
});

// Centralized error handling
app.use(errorHandler);
