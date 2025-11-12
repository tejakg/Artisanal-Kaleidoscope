import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin/middleware';
import { portfolioStore } from '@/lib/admin/store';

export async function GET() {
  try {
    const items = await portfolioStore.getAll();
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const data = await request.json();

    const item = {
      id: `port_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...data,
      createdAt: new Date().toISOString(),
    };

    await portfolioStore.create(item);

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}
