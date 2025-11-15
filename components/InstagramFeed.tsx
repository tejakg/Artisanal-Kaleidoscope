'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
}

interface InstagramFeedProps {
  username?: string;
  limit?: number;
  columns?: number;
}

export default function InstagramFeed({
  username = 'artisanal_kaleidoscope',
  limit = 9,
  columns = 3
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll use placeholder data
    // In production, you would integrate with Instagram Basic Display API
    const placeholderPosts: InstagramPost[] = [
      {
        id: '1',
        caption: 'Beautiful silk thread bangles in vibrant colors 🌸',
        media_url: '/images/portfolio/bangles-1.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
      {
        id: '2',
        caption: 'Handcrafted earrings with intricate details ✨',
        media_url: '/images/portfolio/earrings-1.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
      {
        id: '3',
        caption: 'Custom color combinations available 🎨',
        media_url: '/images/portfolio/custom-1.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
      {
        id: '4',
        caption: 'Traditional designs with modern touch 💫',
        media_url: '/images/portfolio/bangles-2.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
      {
        id: '5',
        caption: 'Perfect for festive occasions 🪔',
        media_url: '/images/portfolio/earrings-2.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
      {
        id: '6',
        caption: 'Handmade with love in Mysuru ❤️',
        media_url: '/images/portfolio/custom-2.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
      {
        id: '7',
        caption: 'Lightweight and comfortable to wear 🌺',
        media_url: '/images/portfolio/bangles-3.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
      {
        id: '8',
        caption: 'Each piece is unique and handcrafted 🎁',
        media_url: '/images/portfolio/earrings-3.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
      {
        id: '9',
        caption: 'DM for custom orders and bulk inquiries 📩',
        media_url: '/images/portfolio/custom-3.jpg',
        permalink: `https://instagram.com/${username}`,
        media_type: 'IMAGE' as const
      },
    ].slice(0, limit);

    setPosts(placeholderPosts);
    setLoading(false);
  }, [username, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="aspect-square bg-neutral-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-3';

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {posts.map((post, index) => (
        <motion.a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={post.media_url}
            alt={post.caption}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-sm line-clamp-2">{post.caption}</p>
            </div>
          </div>
          {/* Instagram icon overlay */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
