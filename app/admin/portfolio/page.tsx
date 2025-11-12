'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { PortfolioItem } from '@/types';

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setItems(items.filter(i => i.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item');
    }
  };

  const filteredItems = items.filter(i =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Portfolio
          </h1>
          <p className="text-neutral-600">Manage your portfolio gallery</p>
        </div>
        <Link href="/admin/portfolio/new">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Add Item
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search portfolio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="spinner w-8 h-8 border-primary-600 mx-auto" />
        </div>
      ) : filteredItems.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-neutral-600 mb-4">
            {searchTerm ? 'No items found' : 'No portfolio items yet'}
          </p>
          {!searchTerm && (
            <Link href="/admin/portfolio/new">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Item
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="aspect-square bg-neutral-100 relative">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-primary-600 uppercase">
                  {item.category}
                </span>
                <h3 className="font-semibold text-neutral-900 mt-1 mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 text-red-600 hover:bg-red-50 border-red-200"
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
