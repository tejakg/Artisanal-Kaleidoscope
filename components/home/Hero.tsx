'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-warm">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-silk-pink/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-silk-teal/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-silk-gold" />
              <span className="text-sm font-medium text-neutral-700">
                Handcrafted in Mysuru
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              Handcrafted Stories in{' '}
              <span className="gradient-text">Silk & Thread</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover exquisite silk-thread jewelry where tradition meets artistry.
              Each piece is lovingly handcrafted to celebrate your unique story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/collections">
                <Button size="lg" className="group">
                  Explore Collections
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/order">
                <Button variant="outline" size="lg">
                  Custom Order
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600 mb-1">500+</div>
                <div className="text-sm text-neutral-600">Designs</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                <div className="text-sm text-neutral-600">Handmade</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600 mb-1">1000+</div>
                <div className="text-sm text-neutral-600">Happy Customers</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 bg-gradient-silk" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Sparkles className="w-20 h-20 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-serif italic">
                    Replace with beautiful product photography
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900">Custom Made</div>
                  <div className="text-sm text-neutral-600">Just for You</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
