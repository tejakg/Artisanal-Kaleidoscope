'use client';

import { motion } from 'framer-motion';
import { Instagram, Youtube } from 'lucide-react';
import InstagramFeed from '@/components/InstagramFeed';

export default function SocialMediaSection() {
  return (
    <section className="section bg-gradient-warm">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Follow Our <span className="gradient-text">Creative Journey</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Stay connected with us on social media for daily inspiration, new designs, and behind-the-scenes content
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://instagram.com/artisanal_kaleidoscope"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm opacity-90">Follow us on</div>
                <div className="font-bold">Instagram</div>
              </div>
            </motion.a>

            <motion.a
              href="https://youtube.com/@artisanal_kaleidoscope"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Youtube className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm opacity-90">Subscribe on</div>
                <div className="font-bold">YouTube</div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Instagram Feed Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
              <Instagram className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">@artisanal_kaleidoscope</span>
            </div>
          </div>
          <InstagramFeed limit={6} columns={3} />
        </motion.div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            View Full Portfolio
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
