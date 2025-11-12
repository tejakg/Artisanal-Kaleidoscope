import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

// Ensure upload directory exists
if (!existsSync(UPLOAD_DIR)) {
  mkdir(UPLOAD_DIR, { recursive: true });
}

/**
 * Save uploaded file
 */
export async function saveFile(
  file: File,
  folder: 'products' | 'portfolio' | 'other' = 'other'
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const timestamp = Date.now();
  const ext = path.extname(file.name);
  const filename = `${timestamp}-${Math.random().toString(36).substring(7)}${ext}`;

  // Ensure folder exists
  const folderPath = path.join(UPLOAD_DIR, folder);
  if (!existsSync(folderPath)) {
    await mkdir(folderPath, { recursive: true });
  }

  // Save file
  const filepath = path.join(folderPath, filename);
  await writeFile(filepath, buffer);

  // Return public URL
  return `/uploads/${folder}/${filename}`;
}

/**
 * Save base64 image (for cropped images)
 */
export async function saveBase64Image(
  base64: string,
  folder: 'products' | 'portfolio' | 'other' = 'other'
): Promise<string> {
  // Remove data URL prefix
  const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid base64 image');

  const ext = matches[1];
  const data = matches[2];
  const buffer = Buffer.from(data, 'base64');

  // Create unique filename
  const timestamp = Date.now();
  const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

  // Ensure folder exists
  const folderPath = path.join(UPLOAD_DIR, folder);
  if (!existsSync(folderPath)) {
    await mkdir(folderPath, { recursive: true });
  }

  // Save file
  const filepath = path.join(folderPath, filename);
  await writeFile(filepath, buffer);

  // Return public URL
  return `/uploads/${folder}/${filename}`;
}

/**
 * Validate file type
 */
export function validateImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Validate file size (max 5MB)
 */
export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSize = maxSizeMB * 1024 * 1024;
  return file.size <= maxSize;
}
