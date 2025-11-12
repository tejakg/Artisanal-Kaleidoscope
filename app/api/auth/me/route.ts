import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin/middleware';

export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);

  if (auth instanceof NextResponse) {
    return auth;
  }

  return NextResponse.json({ user: auth.user });
}
