'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import { collections } from '@/data/products';

const FeaturedCollections = () => {
  const featuredCollections = collections.filter(c => c.featured);

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          <h2 className="section-heading">Explore Our Collections</h2>
          <p className="section-subtitle">
            Handpicked collections that showcase the finest in silk-thread artistry
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/collections#${collection.slug}`}>
                <Card hover className="group">
                  <div className="relative aspect-square overflow-hidden">
                    {/* Placeholder for collection image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-silk-pink to-silk-teal" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-6xl font-display opacity-20">
                        {collection.name.charAt(0)}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    <div className="flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all">
                      View Collection
                      <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/collections">
            <button className="btn-outline group">
              View All Collections
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
