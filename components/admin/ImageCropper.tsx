'use client';

import { useState, useRef, useCallback } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import { X, Upload, Check, RotateCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
  onImageCropped: (croppedImage: string) => void;
  aspectRatio?: number;
  folder?: 'products' | 'portfolio' | 'other';
}

const ImageCropper = ({ onImageCropped, aspectRatio = 1, folder = 'products' }: ImageCropperProps) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isUploading, setIsUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCroppedImg = useCallback(async () => {
    if (!completedCrop || !imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.9);
    });
  }, [completedCrop]);

  const handleCropComplete = async () => {
    if (!completedCrop) return;

    setIsUploading(true);
    try {
      const croppedImage = await getCroppedImg();
      if (!croppedImage) return;

      // Upload cropped image
      const formData = new FormData();
      formData.append('base64', croppedImage);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        onImageCropped(data.url);
        setImgSrc('');
        setCrop(undefined);
        setCompletedCrop(undefined);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setImgSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!imgSrc && (
        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-12 h-12 text-neutral-400 mb-4" />
            <span className="text-lg font-medium text-neutral-700 mb-2">
              Choose an image to upload
            </span>
            <span className="text-sm text-neutral-500">
              PNG, JPG, WebP up to 5MB
            </span>
          </label>
        </div>
      )}

      {imgSrc && (
        <div className="space-y-4">
          <div className="bg-neutral-100 rounded-lg p-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop preview"
                className="max-w-full"
              />
            </ReactCrop>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCropComplete}
              disabled={!completedCrop || isUploading}
              isLoading={isUploading}
              className="flex-1"
            >
              <Check className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Crop & Upload'}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              disabled={isUploading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>

          <p className="text-sm text-neutral-600 text-center">
            Drag to adjust the crop area, then click "Crop & Upload"
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
