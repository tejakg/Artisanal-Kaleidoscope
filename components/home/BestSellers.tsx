'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getBestSellers } from '@/data/products';
import { formatPrice } from '@/lib/utils';

const BestSellers = () => {
  const bestSellers = getBestSellers();

  return (
    <section className="section bg-gradient-warm">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-silk-gold fill-current" />
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
              Customer Favorites
            </span>
            <Star className="w-6 h-6 text-silk-gold fill-current" />
          </div>
          <h2 className="section-heading">Best Selling Pieces</h2>
          <p className="section-subtitle">
            Loved by our customers, crafted with passion
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full group">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-silk-teal" />
                  <div className="absolute top-3 right-3 bg-silk-gold text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Best Seller
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-5xl font-display opacity-20">
                      {product.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    {product.price ? (
                      <span className="text-xl font-bold text-neutral-900">
                        {formatPrice(product.price)}
                      </span>
                    ) : product.priceRange ? (
                      <span className="text-xl font-bold text-neutral-900">
                        {formatPrice(product.priceRange.min)} - {formatPrice(product.priceRange.max)}
                      </span>
                    ) : (
                      <span className="text-sm text-neutral-600 italic">
                        Price on request
                      </span>
                    )}
                  </div>

                  <Link href="/order">
                    <Button variant="outline" size="sm" className="w-full">
                      Request Custom Order
                    </Button>
                  </Link>
                </div>
              </Card>
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
            <Button size="lg" className="group">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;
