import { supabaseAdmin } from './client';

/**
 * Upload file to Supabase Storage
 */
export async function uploadToSupabase(
  file: File,
  bucket: 'products' | 'portfolio',
  folder?: string
): Promise<string> {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(7);
  const ext = file.name.split('.').pop();
  const filename = `${timestamp}-${randomStr}.${ext}`;

  const path = folder ? `${folder}/${filename}` : filename;

  const { data, error } = await supabaseAdmin()
    .storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabaseAdmin()
    .storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Upload base64 image to Supabase Storage
 */
export async function uploadBase64ToSupabase(
  base64: string,
  bucket: 'products' | 'portfolio',
  folder?: string
): Promise<string> {
  // Extract image data
  const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid base64 image');

  const ext = matches[1];
  const data = matches[2];

  // Convert base64 to buffer
  const buffer = Buffer.from(data, 'base64');

  // Create file-like object
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(7);
  const filename = `${timestamp}-${randomStr}.${ext}`;
  const path = folder ? `${folder}/${filename}` : filename;

  const { data: uploadData, error } = await supabaseAdmin()
    .storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: `image/${ext}`,
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabaseAdmin()
    .storage
    .from(bucket)
    .getPublicUrl(uploadData.path);

  return publicUrl;
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFromSupabase(
  url: string,
  bucket: 'products' | 'portfolio'
): Promise<void> {
  try {
    // Extract path from URL
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/storage/v1/object/public/${bucket}/`);
    if (pathParts.length < 2) return;

    const path = pathParts[1];

    const { error } = await supabaseAdmin()
      .storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting from storage:', error);
    // Don't throw - file might already be deleted
  }
}

/**
 * List files in a bucket
 */
export async function listFiles(
  bucket: 'products' | 'portfolio',
  folder?: string
): Promise<string[]> {
  const { data, error } = await supabaseAdmin()
    .storage
    .from(bucket)
    .list(folder);

  if (error) throw error;

  return (data || []).map(file => {
    const { data: { publicUrl } } = supabaseAdmin()
      .storage
      .from(bucket)
      .getPublicUrl(folder ? `${folder}/${file.name}` : file.name);

    return publicUrl;
  });
}
