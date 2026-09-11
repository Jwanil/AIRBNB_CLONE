import {
  hashPassword,
  comparePassword,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
} from './services/auth.service.js';
import { registerSchema, loginSchema } from './schemas/auth.schema.js';
import jwt from 'jsonwebtoken';
import { env } from './config/env.js';

async function runTests() {
  console.log('🧪 Starting Auth Service & Schema Unit Tests...\n');
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

  // 1. Password Hashing & Verification
  const plainPassword = 'SecretPassword123!';
  const hash = await hashPassword(plainPassword);
  assert(hash.startsWith('$2b$12$') || hash.startsWith('$2a$12$'), 'bcrypt hash uses 12 salt rounds');
  assert(await comparePassword(plainPassword, hash), 'comparePassword returns true for correct password');
  assert(!(await comparePassword('WrongPassword123!', hash)), 'comparePassword returns false for wrong password');

  // 2. Token Creation & Verification
  const userId = '65b0c9e1234567890abcdef0';
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);

  const accessPayload = verifyAccessToken(accessToken);
  assert(accessPayload.sub === userId, 'verifyAccessToken decodes correct user ID');

  const refreshPayload = verifyRefreshToken(refreshToken);
  assert(refreshPayload.sub === userId, 'verifyRefreshToken decodes correct user ID');

  // 3. Token Expiration Error Codes
  const expiredToken = jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, { expiresIn: '-1s' });
  try {
    verifyAccessToken(expiredToken);
    assert(false, 'Expired token should throw error');
  } catch (err: any) {
    assert(err.code === 'ACCESS_TOKEN_EXPIRED', 'Expired access token throws ACCESS_TOKEN_EXPIRED code');
  }

  // 4. Token Hashing (SHA-256 for MongoDB storage)
  const tokenHash1 = hashToken('test-refresh-token');
  const tokenHash2 = hashToken('test-refresh-token');
  assert(tokenHash1.length === 64, 'hashToken produces 64-char hex SHA-256 string');
  assert(tokenHash1 === tokenHash2, 'hashToken is deterministic');

  // 5. Schema Validation
  const validRegister = registerSchema.safeParse({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'Password123',
  });
  assert(validRegister.success, 'registerSchema accepts valid registration data');

  const invalidEmail = registerSchema.safeParse({
    name: 'Jane Doe',
    email: 'not-an-email',
    password: 'Password123',
  });
  assert(!invalidEmail.success, 'registerSchema rejects invalid email format');

  const invalidShortPassword = registerSchema.safeParse({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'short',
  });
  assert(!invalidShortPassword.success, 'registerSchema rejects password under 8 chars');

  const invalidNoNumberPassword = registerSchema.safeParse({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'lettersOnlyPassword',
  });
  assert(!invalidNoNumberPassword.success, 'registerSchema rejects password without numbers');

  const validLogin = loginSchema.safeParse({
    email: 'jane@example.com',
    password: 'anypassword',
  });
  assert(validLogin.success, 'loginSchema accepts valid login data');

  console.log(`\n🎉 Results: ${passed}/${total} tests passed!\n`);
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
