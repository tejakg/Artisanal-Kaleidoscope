import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin/middleware';
import { tutorialsStore } from '@/lib/admin/store';
import { getYouTubeVideoId } from '@/lib/utils';

export async function GET() {
  try {
    const tutorials = await tutorialsStore.getAll();
    return NextResponse.json({ tutorials });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tutorials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const data = await request.json();

    const videoId = getYouTubeVideoId(data.youtubeUrl);
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    const tutorial = {
      id: `tut_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      ...data,
      videoId,
      createdAt: new Date().toISOString(),
    };

    await tutorialsStore.create(tutorial);

    return NextResponse.json({ tutorial }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create tutorial' },
      { status: 500 }
    );
  }
}
