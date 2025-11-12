'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, Youtube } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Tutorial } from '@/types';

export default function TutorialsAdminPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = async () => {
    try {
      const response = await fetch('/api/tutorials');
      const data = await response.json();
      setTutorials(data.tutorials || []);
    } catch (error) {
      console.error('Failed to load tutorials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tutorial?')) return;

    try {
      const response = await fetch(`/api/tutorials/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setTutorials(tutorials.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete tutorial:', error);
      alert('Failed to delete tutorial');
    }
  };

  const filteredTutorials = tutorials.filter(t =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.playlist?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Tutorials
          </h1>
          <p className="text-neutral-600">Manage your YouTube tutorials</p>
        </div>
        <Link href="/admin/tutorials/new">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            Add Tutorial
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Search tutorials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="spinner w-8 h-8 border-primary-600 mx-auto" />
        </div>
      ) : filteredTutorials.length === 0 ? (
        <Card className="p-12 text-center">
          <Youtube className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-600 mb-4">
            {searchTerm ? 'No tutorials found' : 'No tutorials yet'}
          </p>
          {!searchTerm && (
            <Link href="/admin/tutorials/new">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Tutorial
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="overflow-hidden">
              <div className="aspect-video bg-neutral-900 relative">
                <iframe
                  src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                {tutorial.playlist && (
                  <span className="text-xs font-medium text-primary-600 uppercase">
                    {tutorial.playlist}
                  </span>
                )}
                <h3 className="font-semibold text-neutral-900 mt-1 mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                  {tutorial.description}
                </p>
                <div className="flex gap-2">
                  <a
                    href={tutorial.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Youtube className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(tutorial.id)}
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
