'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { portfolioItems } from '@/data/products';
import { ProductCategory } from '@/types';

const PortfolioPage = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');

  const categories: Array<ProductCategory | 'all'> = [
    'all',
    'bangles',
    'earrings',
    'necklaces',
    'bridal',
    'festive',
  ];

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === 0 ? filteredItems.length - 1 : selectedImage - 1);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage(selectedImage === filteredItems.length - 1 ? 0 : selectedImage + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
  };

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
              <Camera className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">
                Our Creations
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">
              Portfolio of{' '}
              <span className="gradient-text">Handcrafted Beauty</span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Browse through our collection of finished pieces. Each creation represents
              hours of dedication, skill, and artistic vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-300 via-silk-pink to-silk-teal" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-white/30" />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-all duration-300">
                      <Maximize2 className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags?.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Camera className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-xl text-neutral-600">No items found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-6xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300 via-silk-pink to-silk-teal" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-32 h-32 text-white/30" />
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-display font-bold text-white mb-2">
                  {filteredItems[selectedImage].title}
                </h2>
                {filteredItems[selectedImage].description && (
                  <p className="text-white/80 mb-4">
                    {filteredItems[selectedImage].description}
                  </p>
                )}
                <div className="flex flex-wrap justify-center gap-2">
                  {filteredItems[selectedImage].tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              {selectedImage + 1} / {filteredItems.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
