'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';
import ImageCropper from '@/components/admin/ImageCropper';
import { ProductCategory } from '@/types';

export default function NewPortfolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'bangles' as ProductCategory,
    tags: '',
  });

  const categories: ProductCategory[] = [
    'bangles',
    'earrings',
    'necklaces',
    'custom-sets',
    'festive',
    'bridal',
    'rings',
    'accessories',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);

    try {
      const item = {
        title: formData.title,
        description: formData.description || undefined,
        image,
        category: formData.category,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : undefined,
      };

      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        router.push('/admin/portfolio');
      } else {
        alert('Failed to create item');
      }
    } catch (error) {
      console.error('Failed to create item:', error);
      alert('Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/portfolio">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Add Portfolio Item
          </h1>
          <p className="text-neutral-600">Upload a new portfolio photo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Image Upload
          </h2>
          <ImageCropper
            onImageCropped={setImage}
            folder="portfolio"
            aspectRatio={1}
          />
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Item Details
          </h2>
          <div className="space-y-4">
            <Input
              label="Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g., Peacock Motif Bangles"
              required
            />

            <TextArea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description..."
              rows={3}
            />

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Tags (comma-separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="peacock, traditional, golden"
            />
          </div>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" isLoading={loading} className="flex-1">
            <Plus className="w-5 h-5 mr-2" />
            Add to Portfolio
          </Button>
          <Link href="/admin/portfolio">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
