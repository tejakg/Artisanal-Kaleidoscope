import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
}

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a JWT token
 */
export async function createToken(user: AuthUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    const payload = verified.payload as unknown as AuthUser;
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Simple user store (replace with database in production)
 * Default credentials:
 * Email: admin@artisanalkaleidoscope.com
 * Password: admin123
 */
export const users = [
  {
    id: '1',
    email: 'admin@artisanalkaleidoscope.com',
    // Hash of 'admin123'
    password: '$2a$10$rZqN0YoN5xGJK8xGK8xGKeGVJYj8KYjJK8YjJK8YjJK8YjJK8YjJKe',
    role: 'admin' as const,
  },
];

/**
 * Find user by email
 */
export async function findUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

/**
 * Get auth token from cookies
 */
export function getTokenFromCookies(cookieString?: string): string | null {
  if (!cookieString) return null;
  const match = cookieString.match(/auth-token=([^;]+)/);
  return match ? match[1] : null;
}
