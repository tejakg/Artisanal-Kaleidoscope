'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Card from '@/components/ui/Card';

export default function NewTutorialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    playlist: '',
    duration: '',
    tags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tutorial = {
        title: formData.title,
        description: formData.description,
        youtubeUrl: formData.youtubeUrl,
        playlist: formData.playlist || undefined,
        duration: formData.duration || undefined,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : undefined,
      };

      const response = await fetch('/api/tutorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutorial),
      });

      if (response.ok) {
        router.push('/admin/tutorials');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create tutorial');
      }
    } catch (error) {
      console.error('Failed to create tutorial:', error);
      alert('Failed to create tutorial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/tutorials">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
            Add Tutorial
          </h1>
          <p className="text-neutral-600">Link a new YouTube video</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Video Information
          </h2>
          <div className="space-y-4">
            <Input
              label="YouTube URL *"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              required
            />

            <Input
              label="Title *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="E.g., How to Make Basic Silk Thread Bangles"
              required
            />

            <TextArea
              label="Description *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what viewers will learn..."
              rows={4}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Playlist"
                value={formData.playlist}
                onChange={(e) => setFormData({ ...formData, playlist: e.target.value })}
                placeholder="E.g., Beginner Tutorials"
              />

              <Input
                label="Duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="E.g., 15:30"
              />
            </div>

            <Input
              label="Tags (comma-separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="beginner, bangles, basics"
            />
          </div>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" size="lg" isLoading={loading} className="flex-1">
            <Plus className="w-5 h-5 mr-2" />
            Add Tutorial
          </Button>
          <Link href="/admin/tutorials">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
