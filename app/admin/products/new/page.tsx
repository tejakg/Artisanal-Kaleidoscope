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
import ImagePreview from '@/components/admin/ImagePreview';
import { ProductCategory } from '@/types';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: 'bangles' as ProductCategory,
    description: '',
    price: '',
    priceMin: '',
    priceMax: '',
    materials: '',
    craftsmanship: '',
    customizable: true,
    isFeatured: false,
    isBestSeller: false,
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

  const handleImageCropped = (url: string) => {
    setImages([...images, url]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const price = formData.price ? parseFloat(formData.price) : undefined;
      const priceRange =
        formData.priceMin && formData.priceMax
          ? {
              min: parseFloat(formData.priceMin),
              max: parseFloat(formData.priceMax),
            }
          : undefined;

      const product = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price,
        priceRange,
        images,
        materials: formData.materials.split(',').map((m) => m.trim()),
        craftsmanship: formData.craftsmanship,
        customizable: formData.customizable,
        isFeatured: formData.isFeatured,
        isBestSeller: formData.isBestSeller,
        tags: formData.tags
          ? formData.tags.split(',').map((t) => t.trim())
          : undefined,
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Failed to create product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Add Product
          </h1>
          <p className="text-neutral-600">Create a new product listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <Input
              label="Product Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="E.g., Silk Thread Bangles - Classic Set"
              required
            />

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as ProductCategory })
                }
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

            <TextArea
              label="Description *"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the product..."
              rows={4}
              required
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Pricing
          </h2>
          <p className="text-sm text-neutral-600 mb-4">
            Set either a fixed price OR a price range
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              label="Fixed Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="1000"
            />
            <Input
              label="Min Price (₹)"
              type="number"
              value={formData.priceMin}
              onChange={(e) =>
                setFormData({ ...formData, priceMin: e.target.value })
              }
              placeholder="500"
            />
            <Input
              label="Max Price (₹)"
              type="number"
              value={formData.priceMax}
              onChange={(e) =>
                setFormData({ ...formData, priceMax: e.target.value })
              }
              placeholder="1500"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Product Images
          </h2>
          <ImageCropper onImageCropped={handleImageCropped} folder="products" />
          <ImagePreview images={images} onRemove={handleRemoveImage} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Details
          </h2>
          <div className="space-y-4">
            <Input
              label="Materials (comma-separated) *"
              value={formData.materials}
              onChange={(e) =>
                setFormData({ ...formData, materials: e.target.value })
              }
              placeholder="Silk thread, Metal base, Stone embellishments"
              required
            />

            <TextArea
              label="Craftsmanship *"
              value={formData.craftsmanship}
              onChange={(e) =>
                setFormData({ ...formData, craftsmanship: e.target.value })
              }
              placeholder="Describe the crafting process and techniques..."
              rows={3}
              required
            />

            <Input
              label="Tags (comma-separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="bangles, silk-thread, classic"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Options
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.customizable}
                onChange={(e) =>
                  setFormData({ ...formData, customizable: e.target.checked })
                }
                className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
              />
              <div>
                <span className="font-medium text-neutral-900">Customizable</span>
                <p className="text-sm text-neutral-600">
                  Allow customers to request customizations
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
                className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
              />
              <div>
                <span className="font-medium text-neutral-900">Featured</span>
                <p className="text-sm text-neutral-600">
                  Display on homepage featured section
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) =>
                  setFormData({ ...formData, isBestSeller: e.target.checked })
                }
                className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
              />
              <div>
                <span className="font-medium text-neutral-900">Best Seller</span>
                <p className="text-sm text-neutral-600">Mark as best selling product</p>
              </div>
            </label>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" isLoading={loading} className="flex-1">
            <Plus className="w-5 h-5 mr-2" />
            Create Product
          </Button>
          <Link href="/admin/products">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
