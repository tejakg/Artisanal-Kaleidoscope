'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, Sparkles } from 'lucide-react';
import ProductCard from '@/components/collections/ProductCard';
import { collections } from '@/data/products';

const CollectionsPage = () => {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Handle anchor link navigation
    const hash = window.location.hash.slice(1);
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

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
              <Package className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">
                Our Collections
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">
              Explore Our{' '}
              <span className="gradient-text">Handcrafted Collections</span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              From traditional bangles to contemporary designs, discover jewelry
              that celebrates your unique style and story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections */}
      {collections.map((collection, collectionIndex) => (
        <section
          key={collection.id}
          id={collection.slug}
          ref={(el) => {
            if (el) sectionRefs.current[collection.slug] = el;
          }}
          className={`section ${collectionIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
        >
          <div className="container-custom">
            {/* Collection Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-1 bg-gradient-silk rounded-full" />
                <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                  {collection.category.replace('-', ' ')}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
                {collection.name}
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl">
                {collection.description}
              </p>
            </motion.div>

            {/* Products Grid */}
            {collection.products.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collection.products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center py-16 bg-gradient-warm rounded-3xl"
              >
                <Sparkles className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-3">
                  Custom Creations Await
                </h3>
                <p className="text-lg text-neutral-600 mb-6 max-w-xl mx-auto">
                  This collection features custom-made pieces tailored to your vision.
                  Let's work together to create something uniquely yours.
                </p>
                <a
                  href="/order"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg"
                >
                  Start Your Custom Order
                </a>
              </motion.div>
            )}
          </div>
        </section>
      ))}

      {/* Categories Overview */}
      <section className="section bg-gradient-silk">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Every piece can be customized to match your preferences. Colors, materials,
              designs—we'll work with you to create your perfect jewelry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/order"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-medium hover:bg-neutral-50 transition-colors shadow-xl text-lg"
              >
                Place Custom Order
              </a>
              <a
                href="/tutorials"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-lg"
              >
                Watch Tutorials
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-8">
              Jump to Collection
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {collections.map((collection) => (
                <a
                  key={collection.id}
                  href={`#${collection.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    sectionRefs.current[collection.slug]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  className="px-6 py-3 bg-neutral-100 hover:bg-primary-50 text-neutral-800 hover:text-primary-600 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
                >
                  {collection.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;
