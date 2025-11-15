'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Play, Clock, Tag } from 'lucide-react';
import Card from '@/components/ui/Card';
import YouTubeFeed from '@/components/YouTubeFeed';
import { tutorials } from '@/data/products';
import { getYouTubeVideoId } from '@/lib/utils';

const TutorialsPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('all');

  // Get unique playlists
  const playlists = ['all', ...Array.from(new Set(tutorials.map(t => t.playlist || 'Other')))];

  // Filter tutorials by playlist
  const filteredTutorials = selectedPlaylist === 'all'
    ? tutorials
    : tutorials.filter(t => (t.playlist || 'Other') === selectedPlaylist);

  // Group tutorials by playlist for organized display
  const tutorialsByPlaylist = tutorials.reduce((acc, tutorial) => {
    const playlist = tutorial.playlist || 'Other';
    if (!acc[playlist]) {
      acc[playlist] = [];
    }
    acc[playlist].push(tutorial);
    return acc;
  }, {} as Record<string, typeof tutorials>);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-warm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-sm"
            >
              <Youtube className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">
                Learn the Craft
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">
              Tutorial{' '}
              <span className="gradient-text">Videos</span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Learn the art of silk-thread jewelry making. From basic techniques to advanced
              designs, master the craft with our step-by-step video tutorials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Playlist Filter */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-display font-semibold text-neutral-900 mb-6 text-center">
              Browse by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {playlists.map((playlist) => (
                <button
                  key={playlist}
                  onClick={() => setSelectedPlaylist(playlist)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedPlaylist === playlist
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm'
                  }`}
                >
                  {playlist === 'all' ? 'All Tutorials' : playlist}
                </button>
              ))}
            </div>
          </motion.div>

          {/* YouTube Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <YouTubeFeed channelId="artisanal_kaleidoscope" limit={12} />
          </motion.div>

          {/* Empty State */}
          {filteredTutorials.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Youtube className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-xl text-neutral-600">No tutorials found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-silk">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <Youtube className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Subscribe to Our YouTube Channel
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get notified when we upload new tutorials, behind-the-scenes content,
              and exclusive tips for creating beautiful silk-thread jewelry.
            </p>
            <a
              href="https://youtube.com/@artisanal_kaleidoscope"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-medium hover:bg-neutral-50 transition-colors shadow-xl text-lg"
            >
              <Youtube className="w-6 h-6 mr-2" />
              Subscribe Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Playlists Overview */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2 className="section-heading">Tutorial Playlists</h2>
            <p className="section-subtitle">
              Organized learning paths from beginner to advanced
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(tutorialsByPlaylist).map(([playlist, tutorialList], index) => (
              <motion.div
                key={playlist}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-silk flex items-center justify-center">
                      <Youtube className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-neutral-900">
                        {playlist}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {tutorialList.length} {tutorialList.length === 1 ? 'video' : 'videos'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlaylist(playlist)}
                    className="w-full px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg font-medium transition-colors"
                  >
                    View Playlist
                  </button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorialsPage;
