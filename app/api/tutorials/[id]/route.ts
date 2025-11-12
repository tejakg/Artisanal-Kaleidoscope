import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin/middleware';
import { tutorialsStore } from '@/lib/admin/store';
import { getYouTubeVideoId } from '@/lib/utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const data = await request.json();

    if (data.youtubeUrl) {
      const videoId = getYouTubeVideoId(data.youtubeUrl);
      if (!videoId) {
        return NextResponse.json(
          { error: 'Invalid YouTube URL' },
          { status: 400 }
        );
      }
      data.videoId = videoId;
    }

    const tutorial = await tutorialsStore.update(params.id, data);

    if (!tutorial) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ tutorial });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update tutorial' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const success = await tutorialsStore.delete(params.id);

    if (!success) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete tutorial' },
      { status: 500 }
    );
  }
}
