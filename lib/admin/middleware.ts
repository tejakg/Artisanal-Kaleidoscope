import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromCookies } from './auth';

/**
 * Middleware to check if user is authenticated
 */
export async function requireAuth(request: NextRequest) {
  const token = getTokenFromCookies(request.headers.get('cookie') || '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  return { user };
}

/**
 * Check if user is admin
 */
export function requireAdmin(user: any) {
  if (user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return null;
}
