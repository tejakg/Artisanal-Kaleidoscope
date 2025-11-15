'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoId: string;
}

interface YouTubeFeedProps {
  channelId?: string;
  limit?: number;
}

export default function YouTubeFeed({
  channelId = 'artisanal_kaleidoscope',
  limit = 6
}: YouTubeFeedProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    // Placeholder data - In production, integrate with YouTube Data API
    const placeholderVideos: YouTubeVideo[] = [
      {
        id: '1',
        title: 'How to Make Silk Thread Bangles - Complete Tutorial',
        description: 'Learn the art of making beautiful silk thread bangles from scratch',
        thumbnailUrl: '/images/tutorials/tutorial-1.jpg',
        videoId: 'dQw4w9WgXcQ' // Replace with actual video IDs
      },
      {
        id: '2',
        title: 'Handmade Earrings Design Ideas',
        description: 'Creative earring designs using silk threads and beads',
        thumbnailUrl: '/images/tutorials/tutorial-2.jpg',
        videoId: 'dQw4w9WgXcQ'
      },
      {
        id: '3',
        title: 'Customizing Colors for Your Bangles',
        description: 'Tips for choosing and combining colors for stunning bangles',
        thumbnailUrl: '/images/tutorials/tutorial-3.jpg',
        videoId: 'dQw4w9WgXcQ'
      },
      {
        id: '4',
        title: 'Traditional Mysuru Jewelry Making',
        description: 'Exploring traditional techniques passed down through generations',
        thumbnailUrl: '/images/tutorials/tutorial-4.jpg',
        videoId: 'dQw4w9WgXcQ'
      },
      {
        id: '5',
        title: 'Bridal Collection Showcase',
        description: 'Stunning bridal jewelry pieces for your special day',
        thumbnailUrl: '/images/tutorials/tutorial-5.jpg',
        videoId: 'dQw4w9WgXcQ'
      },
      {
        id: '6',
        title: 'Behind the Scenes - Making Process',
        description: 'See how each piece is handcrafted with love and care',
        thumbnailUrl: '/images/tutorials/tutorial-6.jpg',
        videoId: 'dQw4w9WgXcQ'
      },
    ].slice(0, limit);

    setVideos(placeholderVideos);
    setLoading(false);
  }, [channelId, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-video bg-neutral-200 animate-pulse rounded-lg" />
            <div className="h-4 bg-neutral-200 animate-pulse rounded" />
            <div className="h-3 bg-neutral-200 animate-pulse rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedVideo(video.videoId)}
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-100 mb-3">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              {/* YouTube logo */}
              <div className="absolute top-3 right-3 opacity-90">
                <svg className="w-8 h-8" viewBox="0 0 90 20" fill="none">
                  <path d="M88.119 3.274A2.906 2.906 0 0086.07 1.23C78.45.5 45.05.5 45.05.5s-33.4 0-41.02.73a2.906 2.906 0 00-2.05 2.044C1.25 7.264 1.25 15.5 1.25 15.5s0 8.236.73 12.226a2.906 2.906 0 002.05 2.044c7.62.73 41.02.73 41.02.73s33.4 0 41.02-.73a2.906 2.906 0 002.05-2.044c.73-3.99.73-12.226.73-12.226s0-8.236-.73-12.226z" fill="red"/>
                  <path d="M36.4 22.1V8.9L58.6 15.5 36.4 22.1z" fill="white"/>
                </svg>
              </div>
            </div>
            <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
              {video.title}
            </h3>
            <p className="text-sm text-neutral-600 line-clamp-2">{video.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors"
            onClick={() => setSelectedVideo(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
