import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin/middleware';
import { saveFile, saveBase64Image, validateImageFile, validateFileSize } from '@/lib/admin/files';

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'other';
    const base64 = formData.get('base64') as string;

    // Handle base64 image (cropped images)
    if (base64) {
      const url = await saveBase64Image(
        base64,
        folder as 'products' | 'portfolio' | 'other'
      );
      return NextResponse.json({ url });
    }

    // Handle file upload
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!validateImageFile(file)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' },
        { status: 400 }
      );
    }

    if (!validateFileSize(file)) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    const url = await saveFile(file, folder as 'products' | 'portfolio' | 'other');

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
