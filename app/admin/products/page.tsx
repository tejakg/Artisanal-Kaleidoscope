'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Products
          </h1>
          <p className="text-neutral-600">
            Manage your product catalog
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="spinner w-8 h-8 border-primary-600 mx-auto" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-neutral-600 mb-4">
            {searchTerm ? 'No products found matching your search' : 'No products yet'}
          </p>
          {!searchTerm && (
            <Link href="/admin/products/new">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Product
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-neutral-100 relative">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="mb-4">
                  {product.price ? (
                    <span className="text-lg font-bold text-neutral-900">
                      {formatPrice(product.price)}
                    </span>
                  ) : product.priceRange ? (
                    <span className="text-lg font-bold text-neutral-900">
                      {formatPrice(product.priceRange.min)} - {formatPrice(product.priceRange.max)}
                    </span>
                  ) : (
                    <span className="text-sm text-neutral-600 italic">
                      Price on request
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/products/${product.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:bg-red-50 border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
