# Auth System — Implementation Plan
### For: Airbnb Listing Page Clone (Next.js 16 frontend)
### Stack: Express + Node.js backend, MongoDB (Mongoose), JWT auth

---

## 0. Architecture Decisions (read first, don't deviate without reason)

- **Backend is a standalone service**, separate from the Next.js app — a new folder/repo, e.g. `server/`. It exposes a REST API the Next.js frontend calls.
- **Password hashing:** bcrypt, 12 salt rounds.
- **Session strategy:** JWT access token (short-lived, 15 min) + JWT refresh token (long-lived, 7 days), both set as `httpOnly`, `secure`, `sameSite=lax` cookies — never stored in `localStorage`. This avoids XSS token theft and lets the existing `Save`/wishlist feature migrate cleanly from `localStorage` to a per-user server record later.
- **Refresh flow:** refresh tokens are rotated on every use and stored (hashed) in MongoDB per-user, so a stolen refresh token can be revoked.
- **Validation:** `zod` for request body validation (schema-first, TypeScript-friendly).
- **No email verification / OAuth in MVP** — listed as a stretch goal in Phase 6 so scope stays shippable, mirroring the "PRD vs Extra Features" split already used in this project's docs.

---

## 1. Folder Structure

```
server/
├── src/
│   ├── config/
│   │   ├── env.ts           # validated env vars (zod)
│   │   └── db.ts            # mongoose connection
│   ├── models/
│   │   └── User.ts
│   ├── schemas/
│   │   └── auth.schema.ts   # zod request schemas
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── services/
│   │   └── auth.service.ts  # hashing, token creation/verification
│   ├── middleware/
│   │   ├── auth.middleware.ts     # requireAuth guard
│   │   ├── validate.middleware.ts # zod validation wrapper
│   │   ├── rateLimit.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── utils/
│   │   └── ApiError.ts
│   ├── app.ts                # express app, middleware wiring
│   └── server.ts             # entrypoint, listens on PORT
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 2. Phase 1 — Project Setup

1. `npm init -y` inside `server/`, set `"type": "module"`.
2. Install:
   ```
   npm i express mongoose bcrypt jsonwebtoken cookie-parser cors dotenv zod helmet express-rate-limit
   npm i -D typescript ts-node-dev @types/express @types/node @types/bcrypt @types/jsonwebtoken @types/cookie-parser @types/cors
   ```
3. Add `tsconfig.json` (target ES2022, module NodeNext, strict: true).
4. Add `.env.example`:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://...
   JWT_ACCESS_SECRET=
   JWT_REFRESH_SECRET=
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```
5. `config/env.ts` — parse `process.env` through a zod schema at startup; **crash immediately** if any required var is missing (fail fast, don't let a misconfigured server run silently).
6. `config/db.ts` — `mongoose.connect(env.MONGODB_URI)`, log connection success/failure, exit process on failure.

**Verification:** `npm run dev` starts the server and logs "MongoDB connected" with no unhandled errors.

---

## 3. Phase 2 — User Model

`models/User.ts`:

```ts
{
  name: { type: String, required: true, trim: true, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false }, // hashed, excluded by default
  refreshTokens: [{ tokenHash: String, createdAt: Date, expiresAt: Date }],
  avatarUrl: { type: String, default: null },
  role: { type: String, enum: ["guest", "host"], default: "guest" },
  createdAt / updatedAt via timestamps: true
}
```

- Add a **pre-save hook** that hashes `password` with bcrypt only when it's modified.
- Add an instance method `comparePassword(candidate)` using `bcrypt.compare`.
- Add a unique index on `email` (Mongoose does this via `unique: true`, but explicitly build the index in a migration/seed script too — `unique: true` alone won't retroactively enforce it on existing data).

**Verification:** write a throwaway script that creates a user and confirms the stored `password` field is a bcrypt hash, not plaintext.

---

## 4. Phase 3 — Auth Service (token + hashing logic)

`services/auth.service.ts` should expose pure functions, unit-testable in isolation:

- `hashPassword(plain): Promise<string>`
- `comparePassword(plain, hash): Promise<boolean>`
- `signAccessToken(userId): string` — payload `{ sub: userId }`, expiry from env.
- `signRefreshToken(userId): string`
- `verifyAccessToken(token)` / `verifyRefreshToken(token)` — throw a typed `ApiError(401, ...)` on failure/expiry.
- `hashToken(token): string` — SHA-256 hash used before storing refresh tokens in Mongo (never store raw tokens).

Cookie helper (`utils/cookies.ts`):
- `setAuthCookies(res, accessToken, refreshToken)` — sets both with `httpOnly: true, secure: NODE_ENV==='production', sameSite: 'lax', path: '/'`.
- `clearAuthCookies(res)`.

---

## 5. Phase 4 — Endpoints

Base path: `/api/auth`

| Method | Path              | Body                                | Auth required | Behavior |
|--------|--------------------|--------------------------------------|----------------|----------|
| POST   | `/register`        | `{ name, email, password }`          | No             | Validate → check email uniqueness → hash password → create user → issue token pair → set cookies → return `{ user }` (no password/tokens in body) |
| POST   | `/login`            | `{ email, password }`                | No             | Validate → find user with `+password` → compare hash → issue token pair → set cookies → return `{ user }` |
| POST   | `/refresh`          | none (reads cookie)                  | Refresh cookie | Verify refresh token → check its hash exists in `user.refreshTokens` and isn't expired → rotate: delete old, issue + store new pair → set new cookies |
| POST   | `/logout`           | none                                  | Access cookie  | Remove the matching refresh token hash from the user's `refreshTokens` array → clear cookies |
| GET    | `/me`               | none                                  | Access cookie  | Return current user (via `requireAuth` middleware, `req.userId`) |
| POST   | `/logout-all`       | none (optional, nice-to-have)        | Access cookie  | Clear entire `refreshTokens` array — "log out of all devices" |

**Every response uses a consistent shape:**
```json
{ "success": true, "data": { ... } }
{ "success": false, "error": { "message": "...", "code": "AUTH_INVALID_CREDENTIALS" } }
```
Never leak whether it was the email or the password that was wrong on login — always return a generic "Invalid email or password".

---

## 6. Phase 5 — Middleware

- **`validate.middleware.ts`** — takes a zod schema, parses `req.body`, calls `next()` or passes a 422 `ApiError` with field-level messages.
- **`auth.middleware.ts` (`requireAuth`)** — reads `accessToken` cookie, verifies it, attaches `req.userId`; on missing/invalid token returns 401. If access token is expired specifically, return a distinct error code (`ACCESS_TOKEN_EXPIRED`) so the frontend knows to call `/refresh` and retry, rather than immediately redirecting to login.
- **`rateLimit.middleware.ts`** — apply `express-rate-limit` to `/login` and `/register` specifically (e.g. 10 requests / 15 min per IP) to blunt brute-force/credential-stuffing attempts.
- **`error.middleware.ts`** — central error handler; catches `ApiError` (known, has status+message) vs unknown errors (log full stack server-side, return generic 500 to client — never leak stack traces or Mongo error internals to the client).

`app.ts` wiring order matters: `helmet()` → `cors({ origin: env.CLIENT_URL, credentials: true })` → `express.json()` → `cookieParser()` → routes → `error.middleware`.

---

## 7. Phase 6 — Security Checklist (verify before calling this done)

- [ ] Passwords never appear in any API response, log line, or error message.
- [ ] Password field has `select: false` in the schema so `.find()`/`.findById()` never accidentally return it.
- [ ] Refresh tokens stored hashed, not raw — a DB leak shouldn't hand out usable tokens.
- [ ] Cookies are `httpOnly` — confirm via browser DevTools that JS `document.cookie` cannot read them.
- [ ] `cors` is scoped to the exact frontend origin, not `*`, since `credentials: true` is set.
- [ ] Registration enforces a minimum password strength (zod: min 8 chars, at least one letter + one number).
- [ ] Login and register routes are rate-limited.
- [ ] Generic error messages on login (don't reveal whether the account exists).
- [ ] Mongo connection string and JWT secrets only ever come from `.env`, never hardcoded; `.env` is in `.gitignore`.
- [ ] `helmet()` is applied.

---

## 8. Phase 7 — Frontend Integration Notes (Next.js App Router side)

- Since cookies are `httpOnly`, the frontend never manually manages tokens — the browser sends cookies automatically on requests to the API domain (requires `credentials: 'include'` on `fetch` calls, and matching cookie `domain`/CORS config in dev if frontend and backend run on different ports).
- Add a small `lib/api.ts` wrapper on the frontend with `fetch` calls to `/api/auth/*`, and a `useAuth()` hook / React context that calls `GET /me` on app load to hydrate the logged-in state.
- The existing `Save` (wishlist) button currently persists to `localStorage` per the project doc — once auth exists, migrate this to a `POST /api/wishlist` tied to `req.userId`, falling back to `localStorage` for guests. This is a good Phase 2 (post-MVP) task, not part of the initial auth build.
- Gate the `Reserve` button / reservation modal behind auth: if `useAuth()` shows no user, open the login modal instead of the reservation modal.

---

## 9. Stretch Goals (explicitly out of scope for MVP — do not build unless asked)

- Email verification (would need an email service like Resend/SendGrid).
- Password reset via emailed token.
- OAuth (Google login).
- Account lockout after N failed attempts (rate limiting covers the MVP threat model adequately for now).

---

## 10. Suggested Build Order for the Agent

1. Phase 1 (setup) → verify server boots and connects to MongoDB.
2. Phase 2 (User model) → verify hashing works via a throwaway script, then delete the script.
3. Phase 3 (auth service) → no HTTP yet, just unit-test the functions.
4. Phase 4 (routes/controllers) using the service layer.
5. Phase 5 (middleware) wired into `app.ts`.
6. Run through the Phase 6 security checklist item by item.
7. Only then move to Phase 7 frontend wiring.

Each phase should be a separate commit so the work is reviewable in isolation.
