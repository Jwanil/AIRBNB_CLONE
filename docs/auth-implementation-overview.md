# Authentication System — Implementation Overview & Technical Documentation

> **Project:** Airbnb Listing Page Clone  
> **Feature:** Full-Stack JWT Authentication with Refresh Token Rotation  
> **Architecture:** Standalone Express.js Backend Service + Next.js Frontend Integration  
> **Status:** ✅ Fully Implemented & Verified

---

## 1. Executive Summary

A complete, production-ready authentication system was implemented for the Airbnb Clone project. The system provides secure user registration, login, session management, and automatic token refresh — all integrated seamlessly with the existing Next.js frontend. The backend is a standalone Express.js + TypeScript service communicating with MongoDB Atlas, designed for independent deployment.

### Key Security Features
- **Dual JWT Token Architecture** — Short-lived access tokens (15 min) + long-lived refresh tokens (7 days)
- **Refresh Token Rotation** — Each refresh invalidates the old token and issues a new pair
- **httpOnly Cookies** — Tokens stored in `httpOnly`, `secure`, `sameSite` cookies (immune to XSS)
- **SHA-256 Token Hashing** — Refresh tokens stored as SHA-256 hashes in MongoDB (not plaintext)
- **bcrypt Password Hashing** — 12-round salt for password storage
- **Rate Limiting** — Auth endpoints limited to 15 requests per 15-minute window per IP
- **Zod Schema Validation** — Request body validation on both server and client
- **Helmet Security Headers** — Comprehensive HTTP security headers via `helmet`
- **CORS with Credentials** — Origin-scoped cross-origin policy with cookie support

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Next.js 16)                             │
│  ┌────────────┐   ┌──────────────┐   ┌───────────────┐                │
│  │ AuthContext │──▶│  api.ts      │──▶│ AuthModal.tsx  │               │
│  │ (Provider)  │   │ (API Client) │   │ (Login/Signup) │               │
│  │             │   │              │   └───────────────┘                │
│  │ • user      │   │ • credentials│   ┌───────────────┐                │
│  │ • login()   │   │   : include  │   │ Header.tsx     │               │
│  │ • register()│   │ • auto-retry │   │ (User Menu)    │               │
│  │ • logout()  │   │   on 401     │   └───────────────┘                │
│  │ • refreshUser│  │              │   ┌───────────────┐                │
│  └────────────┘   └──────────────┘   │ BookingCard.tsx│                │
│                         │             │ (Auth Gate)    │                │
│                         │             └───────────────┘                │
│                         │ fetch + httpOnly cookies                      │
│                         ▼                                              │
├─────────────────────────────────────────────────────────────────────────┤
│                        SERVER (Express.js + TypeScript)                 │
│                                                                         │
│  ┌─────────────────────┐                                               │
│  │  Middleware Pipeline │                                               │
│  │  helmet → cors →    │                                               │
│  │  json → cookieParser│                                               │
│  │  → routes → error   │                                               │
│  └────────┬────────────┘                                               │
│           │                                                             │
│  ┌────────▼────────────┐    ┌──────────────┐    ┌─────────────────┐    │
│  │   Auth Routes       │───▶│ Auth         │───▶│ Auth Service    │    │
│  │   /api/auth/*       │    │ Controller   │    │ (JWT + bcrypt)  │    │
│  │                     │    │              │    └─────────────────┘    │
│  │  POST /register     │    │ register()   │                           │
│  │  POST /login        │    │ login()      │    ┌─────────────────┐    │
│  │  POST /refresh      │    │ refresh()    │───▶│ User Model      │    │
│  │  POST /logout       │    │ logout()     │    │ (Mongoose)      │    │
│  │  GET  /me           │    │ me()         │    └────────┬────────┘    │
│  │  POST /logout-all   │    │ logoutAll()  │             │             │
│  └─────────────────────┘    └──────────────┘             ▼             │
│                                                   ┌─────────────┐     │
│                                                   │  MongoDB    │     │
│                                                   │  Atlas      │     │
│                                                   │  Cluster 0  │     │
│                                                   └─────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Authentication Flow

### 3.1 Registration Flow
1. User fills out name, email, password in `AuthModal` (Sign Up tab)
2. Client-side validation: real-time password strength meter checks 8+ chars, letter, number
3. `POST /api/auth/register` → Zod validates body → checks email uniqueness
4. Password hashed with bcrypt (12 rounds) → User document saved to MongoDB
5. Access + Refresh tokens generated → Refresh token SHA-256 hashed and stored in user's `refreshTokens[]`
6. Both tokens set as `httpOnly` cookies → User JSON returned (no password/tokens in body)
7. `AuthContext` updates `user` state → modal closes → toast notification

### 3.2 Login Flow
1. User enters email + password in `AuthModal` (Log In tab)
2. `POST /api/auth/login` → Zod validates → finds user with `+password` select
3. bcrypt compares password → if mismatch: generic "Invalid email or password" (prevents enumeration)
4. Expired refresh tokens pruned → new token pair issued → cookies set
5. Frontend state updates identically to registration

### 3.3 Automatic Token Refresh
1. Any authenticated API call that returns `401` with code `ACCESS_TOKEN_EXPIRED`
2. `api.ts` intercepts → calls `POST /api/auth/refresh` automatically
3. Server verifies old refresh token signature → finds SHA-256 hash in user's stored tokens
4. **Token Rotation**: old token removed, new pair issued, new hash stored
5. Original failed request retried with new cookies → transparent to user
6. Concurrent 401s queue behind a single refresh (prevents race conditions)

### 3.4 Logout Flow
1. `POST /api/auth/logout` → Server removes matching refresh token hash from DB
2. Both `httpOnly` cookies cleared
3. Frontend sets `user = null` → UI updates to logged-out state

---

## 4. Directory Structure & Files Changed

### 4.1 New Backend Service (`server/`)

```
server/
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Template for required env vars
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config (NodeNext modules)
└── src/
    ├── server.ts                 # Entry point: connects DB, starts HTTP server
    ├── app.ts                    # Express app: middleware pipeline + routes
    ├── config/
    │   ├── env.ts                # Zod-validated environment config
    │   └── db.ts                 # Mongoose connection handler
    ├── models/
    │   └── User.ts               # User schema with bcrypt hooks & refresh tokens
    ├── schemas/
    │   └── auth.schema.ts        # Zod request validation (register, login)
    ├── services/
    │   └── auth.service.ts       # JWT signing/verification, bcrypt, SHA-256 hashing
    ├── controllers/
    │   └── auth.controller.ts    # Route handlers (register, login, refresh, etc.)
    ├── middleware/
    │   ├── auth.middleware.ts     # requireAuth: cookie-based access token verification
    │   ├── validate.middleware.ts # Zod schema validation middleware
    │   ├── rateLimit.middleware.ts# IP-based rate limiting (15 req / 15 min)
    │   └── error.middleware.ts   # Centralized error formatting & sanitization
    ├── routes/
    │   └── auth.routes.ts        # Route definitions for /api/auth/*
    ├── utils/
    │   ├── ApiError.ts           # Custom error class with HTTP codes
    │   └── cookies.ts            # httpOnly cookie set/clear utilities
    ├── verify-auth.ts            # Unit verification script
    └── verify-endpoints.ts       # API endpoint verification script
```

### 4.2 Frontend Changes (`src/`)

| File | Change | Description |
|------|--------|-------------|
| `src/lib/api.ts` | **NEW** | API client with `credentials: 'include'`, automatic 401 refresh/retry interceptor, typed `authApi` methods |
| `src/context/AuthContext.tsx` | **NEW** | React Context providing `user`, `isLoading`, `login()`, `register()`, `logout()`, modal state management |
| `src/components/AuthModal.tsx` | **NEW** | Full Airbnb-styled auth modal with Login/Signup tabs, password strength meter, show/hide toggle, real-time validation checklist |
| `src/app/layout.tsx` | **MODIFIED** | Wrapped app with `<AuthProvider>`, added `<AuthModal />` and `<Toaster />` |
| `src/components/Header.tsx` | **MODIFIED** | User dropdown menu: shows avatar/initials + name + email + logout when authenticated; Sign up/Log in when guest |
| `src/components/BookingCard.tsx` | **MODIFIED** | Reserve button now gates behind auth — opens login modal if user is not logged in |
| `.env.local` | **NEW** | `NEXT_PUBLIC_API_URL=http://localhost:5001` for frontend API routing |
| `.gitignore` | **MODIFIED** | Added `.env*` pattern + `!.env.example` exemption, `node_modules/`, `dist/` |
| `docs/prompts.md` | **MODIFIED** | Added auth implementation prompts and password validation feature entry |

### 4.3 Dependencies Added

**Server (`server/package.json`):**
| Package | Purpose |
|---------|---------|
| `express` | HTTP framework |
| `mongoose` | MongoDB ODM |
| `bcrypt` | Password hashing (12 rounds) |
| `jsonwebtoken` | JWT signing & verification |
| `cookie-parser` | Parse httpOnly cookies |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable loading |
| `zod` | Runtime schema validation |
| `helmet` | Security HTTP headers |
| `express-rate-limit` | IP-based rate limiting |
| `tsx` | TypeScript execution (dev) |
| `typescript` | Type checking & compilation |

**Frontend (`package.json`):**
| Package | Purpose |
|---------|---------|
| `react-hot-toast` | Toast notifications for auth events |

---

## 5. API Endpoints Reference

Base URL: `http://localhost:5001/api/auth`

| Method | Endpoint | Auth Required | Rate Limited | Description |
|--------|----------|:---:|:---:|-------------|
| `POST` | `/register` | ❌ | ✅ | Create new user account |
| `POST` | `/login` | ❌ | ✅ | Authenticate with email/password |
| `POST` | `/refresh` | ❌ (cookie) | ❌ | Rotate token pair using refresh cookie |
| `POST` | `/logout` | ❌ | ❌ | Revoke refresh token & clear cookies |
| `GET`  | `/me` | ✅ | ❌ | Get current authenticated user profile |
| `POST` | `/logout-all` | ✅ | ❌ | Revoke ALL refresh tokens for user |
| `GET`  | `/health` | ❌ | ❌ | Server health check |

### Request/Response Examples

**Register:**
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jwanil Modi","email":"jwanil@test.com","password":"Test1234"}' \
  -c cookies.txt

# Response: { "success": true, "data": { "user": { "_id": "...", "name": "Jwanil Modi", "email": "jwanil@test.com", "role": "guest" } } }
# Set-Cookie: accessToken=...; HttpOnly; Path=/
# Set-Cookie: refreshToken=...; HttpOnly; Path=/
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jwanil@test.com","password":"Test1234"}' \
  -c cookies.txt
```

---

## 6. User Model Schema

```typescript
{
  name:          String    // required, max 60 chars, trimmed
  email:         String    // required, unique, lowercase, indexed
  password:      String    // required, bcrypt hashed, select: false
  refreshTokens: [{        // array of active refresh tokens
    tokenHash:   String    // SHA-256 hash of the JWT refresh token
    createdAt:   Date
    expiresAt:   Date
  }]
  avatarUrl:     String    // nullable, default null
  role:          String    // enum: 'guest' | 'host', default 'guest'
  createdAt:     Date      // auto (timestamps: true)
  updatedAt:     Date      // auto (timestamps: true)
}
```

**Security Notes:**
- `password` field uses `select: false` — never included in queries unless explicitly requested
- `toJSON` transform removes `password`, `refreshTokens`, and `__v` from all API responses
- Pre-save hook auto-hashes password only when the `password` field is modified

---

## 7. Security Architecture

### 7.1 Token Strategy
| Token | Type | Lifetime | Storage | Purpose |
|-------|------|----------|---------|---------|
| Access Token | JWT | 15 minutes | `httpOnly` cookie | API request authentication |
| Refresh Token | JWT (with `jti`) | 7 days | `httpOnly` cookie + SHA-256 hash in MongoDB | Silent session renewal |

### 7.2 Cookie Configuration
```typescript
{
  httpOnly: true,                       // Not accessible via JavaScript (XSS protection)
  secure: NODE_ENV === 'production',    // HTTPS only in production
  sameSite: isProd ? 'none' : 'lax',    // Cross-site support for prod (frontend ≠ backend domain)
  path: '/',
  maxAge: 15 * 60 * 1000               // Access: 15 min, Refresh: 7 days
}
```

### 7.3 Threat Mitigations
| Threat | Mitigation |
|--------|-----------|
| XSS Token Theft | `httpOnly` cookies — JS cannot read tokens |
| CSRF | `sameSite` cookie attribute + origin-restricted CORS |
| Brute Force | Rate limiting: 15 attempts / 15 min per IP |
| Token Replay | Refresh token rotation — old tokens invalidated on use |
| Password Cracking | bcrypt with 12 salt rounds (~250ms per hash) |
| DB Breach (tokens) | Refresh tokens stored as SHA-256 hashes, not plaintext |
| Email Enumeration | Generic "Invalid email or password" on login failure |
| Header Injection | `helmet` sets CSP, X-Frame-Options, HSTS, etc. |

---

## 8. Frontend Auth UX Features

### 8.1 Auth Modal (`AuthModal.tsx`)
- **Tabbed Interface** — Login / Sign Up tabs with smooth transitions
- **Real-time Password Strength Meter** — 4-bar visual indicator (Weak → Fair → Good → Strong)
- **Validation Checklist** — Live checkmarks for: 8+ characters, letter, number
- **Show/Hide Password Toggle** — "Show" / "Hide" button in the password field header
- **Inline Error Messages** — Red error banner for server-side validation errors
- **ESC Key Support** — Closes modal on Escape keypress
- **Backdrop Click Close** — Click outside modal to dismiss

### 8.2 Header User Menu
- **Guest State:** Sign up, Log in, Airbnb your home, Help Centre
- **Authenticated State:** User avatar/initials circle, name, email, Wishlists, Airbnb your home, Log out (red)

### 8.3 Auth-Gated Reservation
- Clicking "Reserve" on the `BookingCard` when not logged in opens the auth modal instead of the reservation modal

---

## 9. Local Development Quick Start

```bash
# Terminal 1 — Backend
cd airbnb-clone/server
cp .env.example .env        # Edit .env with your MongoDB URI
npm install
npm run dev                 # Starts on http://localhost:5001

# Terminal 2 — Frontend
cd airbnb-clone
npm run dev                 # Starts on http://localhost:3000
```

The frontend automatically proxies auth requests to `http://localhost:5001` via `NEXT_PUBLIC_API_URL` in `.env.local`.

---

## 10. Testing & Verification

Two verification scripts are included:

```bash
# Run from server directory
npm test
```

This executes:
1. **`verify-auth.ts`** — Tests bcrypt hashing, JWT signing/verification, SHA-256 token hashing
2. **`verify-endpoints.ts`** — Full API endpoint test suite (register → login → me → refresh → logout)

---

*Last Updated: September 11, 2026*  
*Author: Jwanil Modi (23BIT194)*
