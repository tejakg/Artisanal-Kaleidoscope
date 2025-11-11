'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Instagram, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/lib/config';
import { getWhatsAppUrl } from '@/lib/utils';

const CTASection = () => {
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-silk p-12 md:p-16 lg:p-20">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to Create Something Special?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10">
                Let's bring your vision to life with custom handcrafted jewelry.
                Every piece tells a unique story—let's create yours together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppUrl(
                    siteConfig.links.whatsapp,
                    'Hi! I would like to place a custom order.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="group bg-white hover:bg-neutral-50 text-primary-600"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" />
                    WhatsApp Us
                  </Button>
                </a>

                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    <Instagram className="mr-2 w-5 h-5" />
                    Follow on Instagram
                  </Button>
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12 pt-8 border-t border-white/30"
              >
                <p className="text-white/80 mb-4">Or explore more about us</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/about">
                    <button className="text-white hover:text-white/80 transition-colors font-medium">
                      Our Story
                    </button>
                  </Link>
                  <span className="text-white/50">•</span>
                  <Link href="/portfolio">
                    <button className="text-white hover:text-white/80 transition-colors font-medium">
                      View Portfolio
                    </button>
                  </Link>
                  <span className="text-white/50">•</span>
                  <Link href="/tutorials">
                    <button className="text-white hover:text-white/80 transition-colors font-medium">
                      Watch Tutorials
                    </button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
