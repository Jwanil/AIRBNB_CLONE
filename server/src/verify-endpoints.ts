import http from 'http';
import mongoose from 'mongoose';
import { app } from './app.js';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';

let server: http.Server;
const TEST_PORT = 5055;
const BASE_URL = `http://localhost:${TEST_PORT}`;

function parseCookies(setCookieHeaders: string[] | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!setCookieHeaders) return cookies;
  for (const str of setCookieHeaders) {
    const parts = str.split(';');
    const [name, val] = parts[0].split('=');
    if (name && val) {
      cookies[name.trim()] = val.trim();
    }
  }
  return cookies;
}

async function request(
  method: string,
  path: string,
  body?: any,
  cookies?: Record<string, string>
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Origin: 'http://localhost:3000',
  };

  if (cookies && Object.keys(cookies).length > 0) {
    headers['Cookie'] = Object.entries(cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {}

  const setCookie = res.headers.getSetCookie ? res.headers.getSetCookie() : [];

  return {
    status: res.status,
    headers: res.headers,
    data: json,
    cookies: parseCookies(setCookie),
    rawCookies: setCookie,
  };
}

async function runE2ETests() {
  console.log('🚀 Running End-to-End API Auth Test Suite...\n');
  await connectDB();

  server = app.listen(TEST_PORT);
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, name: string) {
    total++;
    if (condition) {
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${name}`);
      process.exitCode = 1;
    }
  }

  const testEmail = `e2e_${Date.now()}@example.com`;
  const testPassword = 'StrongPassword123!';
  let authCookies: Record<string, string> = {};

  try {
    // 1. Health check
    const health = await request('GET', '/health');
    assert(health.status === 200 && health.data.status === 'ok', 'GET /health returns 200 OK');

    // 2. Security Headers (Helmet)
    assert(health.headers.get('x-content-type-options') === 'nosniff', 'Helmet security headers applied');

    // 3. Register Validation - weak password
    const weakReg = await request('POST', '/api/auth/register', {
      name: 'Test',
      email: testEmail,
      password: 'weak',
    });
    assert(weakReg.status === 422 && weakReg.data.error?.code === 'VALIDATION_ERROR', 'POST /register rejects password under 8 chars with 422');

    // 4. Register Success
    const regRes = await request('POST', '/api/auth/register', {
      name: 'Alice Wonder',
      email: testEmail,
      password: testPassword,
    });
    assert(regRes.status === 201, 'POST /register creates user with 201 Created');
    assert(regRes.data.success === true, 'Response follows { success: true, data } format');
    assert(regRes.data.data.user.name === 'Alice Wonder', 'Returned user contains name');
    assert(regRes.data.data.user.email === testEmail, 'Returned user contains email');
    assert(regRes.data.data.user.password === undefined, 'Password is NOT exposed in response body');
    assert(regRes.data.data.user.refreshTokens === undefined, 'Refresh tokens are NOT exposed in response body');
    assert(Boolean(regRes.cookies.accessToken), 'Set-Cookie contains accessToken');
    assert(Boolean(regRes.cookies.refreshToken), 'Set-Cookie contains refreshToken');

    // Verify HttpOnly cookie attributes
    const rawSetCookies = regRes.rawCookies.join(' || ');
    assert(rawSetCookies.toLowerCase().includes('httponly'), 'Cookies have HttpOnly attribute');
    assert(rawSetCookies.toLowerCase().includes('samesite=lax'), 'Cookies have SameSite=Lax attribute');

    authCookies = regRes.cookies;

    // 5. Register Duplicate
    const dupRes = await request('POST', '/api/auth/register', {
      name: 'Alice Clone',
      email: testEmail,
      password: testPassword,
    });
    assert(dupRes.status === 409 && dupRes.data.error?.code === 'EMAIL_ALREADY_EXISTS', 'POST /register rejects duplicate email with 409');

    // 6. GET /api/auth/me - without cookies
    const unauthMe = await request('GET', '/api/auth/me');
    assert(unauthMe.status === 401 && unauthMe.data.error?.code === 'AUTH_REQUIRED', 'GET /me without cookie returns 401 AUTH_REQUIRED');

    // 7. GET /api/auth/me - with access cookie
    const authMe = await request('GET', '/api/auth/me', undefined, { accessToken: authCookies.accessToken });
    assert(authMe.status === 200 && authMe.data.data.user.email === testEmail, 'GET /me returns user profile with valid access token');

    // 8. Login - Invalid Credentials (Generic error)
    const badLogin = await request('POST', '/api/auth/login', {
      email: testEmail,
      password: 'WrongPassword123!',
    });
    assert(badLogin.status === 401 && badLogin.data.error?.message === 'Invalid email or password', 'POST /login with wrong password returns generic 401');

    const nonExistentLogin = await request('POST', '/api/auth/login', {
      email: 'nonexistent@example.com',
      password: 'WrongPassword123!',
    });
    assert(nonExistentLogin.status === 401 && nonExistentLogin.data.error?.message === 'Invalid email or password', 'POST /login with nonexistent email returns identical generic 401');

    // 9. Login - Success
    const loginRes = await request('POST', '/api/auth/login', {
      email: testEmail,
      password: testPassword,
    });
    assert(loginRes.status === 200 && loginRes.data.success === true, 'POST /login succeeds with 200');
    assert(Boolean(loginRes.cookies.accessToken), 'Login sets new accessToken cookie');
    assert(Boolean(loginRes.cookies.refreshToken), 'Login sets new refreshToken cookie');

    const freshCookies = loginRes.cookies;

    // 10. Refresh Token Rotation
    const refreshRes = await request('POST', '/api/auth/refresh', undefined, { refreshToken: freshCookies.refreshToken });
    assert(refreshRes.status === 200 && refreshRes.data.success === true, 'POST /refresh succeeds with 200');
    assert(Boolean(refreshRes.cookies.accessToken), 'Refresh issues new accessToken cookie');
    assert(Boolean(refreshRes.cookies.refreshToken), 'Refresh issues new refreshToken cookie (rotated)');

    const rotatedCookies = refreshRes.cookies;

    // 11. Old Refresh Token Reuse Detection
    const oldRefreshRes = await request('POST', '/api/auth/refresh', undefined, { refreshToken: freshCookies.refreshToken });
    assert(oldRefreshRes.status === 401, 'POST /refresh rejects old (rotated) refresh token with 401');

    // 12. Logout
    const logoutRes = await request('POST', '/api/auth/logout', undefined, rotatedCookies);
    assert(logoutRes.status === 200 && logoutRes.data.success === true, 'POST /logout succeeds with 200');

    // Verify refresh token can no longer be used after logout
    const afterLogoutRefresh = await request('POST', '/api/auth/refresh', undefined, { refreshToken: rotatedCookies.refreshToken });
    assert(afterLogoutRefresh.status === 401, 'Logged out refresh token cannot be refreshed');

  } finally {
    // Clean up test user
    await User.deleteOne({ email: testEmail });
    console.log('\n🧹 Test user cleaned up.');

    server.close();
    await mongoose.disconnect();
  }

  console.log(`\n🎉 E2E Test Results: ${passed}/${total} checks passed!\n`);
}

runE2ETests().catch((err) => {
  console.error('Fatal E2E test error:', err);
  if (server) server.close();
  process.exit(1);
});
