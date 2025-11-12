'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
  images: string[];
  onRemove: (index: number) => void;
  title?: string;
}

const ImagePreview = ({ images, onRemove, title = 'Uploaded Images' }: ImagePreviewProps) => {
  if (images.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-neutral-900">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-neutral-200">
            <div className="relative w-full h-full bg-neutral-100">
              <Image
                src={url}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <button
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
