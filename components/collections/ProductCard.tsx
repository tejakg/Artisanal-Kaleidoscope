'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <Card hover className="h-full flex flex-col group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200 via-silk-pink to-silk-teal" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-20 h-20 text-white/30" />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            {product.isBestSeller && (
              <span className="px-3 py-1 bg-silk-gold text-white text-xs font-semibold rounded-full shadow-lg">
                Best Seller
              </span>
            )}
            {product.customizable && (
              <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full shadow-lg ml-auto">
                Customizable
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-600 mb-4 line-clamp-3 flex-1">
            {product.description}
          </p>

          {/* Materials */}
          <div className="mb-4">
            <p className="text-xs font-medium text-neutral-700 mb-1">Materials:</p>
            <div className="flex flex-wrap gap-1">
              {product.materials.slice(0, 3).map((material, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>

          {/* Craftsmanship Note */}
          <div className="mb-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-xs text-neutral-700 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{product.craftsmanship}</span>
            </p>
          </div>

          {/* Price */}
          <div className="mb-4">
            {product.price ? (
              <div className="text-2xl font-bold text-neutral-900">
                {formatPrice(product.price)}
              </div>
            ) : product.priceRange ? (
              <div>
                <div className="text-2xl font-bold text-neutral-900">
                  {formatPrice(product.priceRange.min)} - {formatPrice(product.priceRange.max)}
                </div>
                <p className="text-xs text-neutral-600 mt-1">Varies by customization</p>
              </div>
            ) : (
              <div className="text-sm text-neutral-600 italic">Price on request</div>
            )}
          </div>

          {/* CTA Button */}
          <Link href="/order" className="mt-auto">
            <Button variant="primary" size="md" className="w-full group">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Request Custom Order
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
