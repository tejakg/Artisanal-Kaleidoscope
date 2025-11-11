'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Award, Scissors, Palette } from 'lucide-react';
import type { Metadata } from 'next';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Craft',
      description: 'Every piece is created with love, care, and dedication to preserving traditional artistry.',
    },
    {
      icon: Sparkles,
      title: 'Quality Excellence',
      description: 'We use only premium materials and time-tested techniques to ensure lasting beauty.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your vision and satisfaction drive everything we create. Every piece is personal.',
    },
    {
      icon: Award,
      title: 'Authentic Tradition',
      description: 'Rooted in Mysuru\'s rich heritage, our jewelry celebrates timeless Indian artistry.',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Design & Consultation',
      description: 'We discuss your vision, preferences, and the occasion to create the perfect design.',
      icon: Palette,
    },
    {
      number: '02',
      title: 'Material Selection',
      description: 'Premium silk threads, stones, and embellishments are carefully chosen for your piece.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'Handcrafting',
      description: 'Each piece is meticulously handcrafted using traditional techniques passed down through generations.',
      icon: Scissors,
    },
    {
      number: '04',
      title: 'Quality Check & Delivery',
      description: 'Every piece undergoes rigorous quality inspection before being lovingly packaged for you.',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-warm">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-silk-pink/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-silk-teal/30 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
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
              <Heart className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">
                Our Story
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">
              Crafted with{' '}
              <span className="gradient-text">Love & Tradition</span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              From the cultural heart of Mysuru, we bring you handcrafted silk-thread jewelry
              that celebrates tradition, artistry, and your unique story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-300 via-silk-pink to-silk-teal" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-32 h-32 text-white/30" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                    The Journey Began with a Thread
                  </h2>
                  <div className="w-20 h-1 bg-gradient-silk rounded-full" />
                </div>

                <p className="text-lg text-neutral-600 leading-relaxed">
                  Growing up in Mysuru, I was surrounded by the rich heritage of traditional crafts.
                  My grandmother's skilled hands weaving intricate patterns with silk threads
                  sparked a fascination that would become my life's passion.
                </p>

                <p className="text-lg text-neutral-600 leading-relaxed">
                  What started as a childhood curiosity blossomed into years of learning,
                  practicing, and perfecting the art of silk-thread jewelry. Each technique
                  passed down through generations carries stories of dedication and love.
                </p>

                <p className="text-lg text-neutral-600 leading-relaxed">
                  Today, Artisanal Kaleidoscope is more than a business—it's a celebration
                  of heritage, a platform for creativity, and a way to share the beauty of
                  handcrafted art with the world. Every piece we create carries this legacy forward.
                </p>

                <div className="pt-4">
                  <p className="text-2xl font-serif italic text-primary-600">
                    "Every thread tells a story, every piece holds a memory."
                  </p>
                  <p className="mt-2 text-neutral-700 font-medium">
                    — Founder, Artisanal Kaleidoscope
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2 className="section-heading">What We Stand For</h2>
            <p className="section-subtitle">
              The principles that guide every creation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-silk flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2 className="section-heading">Our Craft Process</h2>
            <p className="section-subtitle">
              From vision to reality, one thread at a time
            </p>
          </motion.div>

          <div className="space-y-12">
            {process.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="order-2 lg:order-1">
                        <div className="flex items-start gap-6">
                          <div className="text-6xl font-display font-bold text-primary-200">
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                              {step.title}
                            </h3>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="order-1 lg:order-2">
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-200 via-silk-pink to-silk-teal flex items-center justify-center">
                          <step.icon className="w-24 h-24 text-white/40" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="order-1">
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-silk-teal via-silk-lavender to-primary-300 flex items-center justify-center">
                          <step.icon className="w-24 h-24 text-white/40" />
                        </div>
                      </div>
                      <div className="order-2">
                        <div className="flex items-start gap-6">
                          <div className="text-6xl font-display font-bold text-primary-200">
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                              {step.title}
                            </h3>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="section bg-gradient-warm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="section-heading mb-6">Behind the Artistry</h2>
            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              Every piece of jewelry is born from hours of meticulous handwork, a deep understanding
              of color theory, and an unwavering commitment to quality. Our workshop in Mysuru
              is where tradition meets creativity, where silk threads transform into wearable art.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary-300 via-silk-coral to-silk-gold"
                />
              ))}
            </div>

            <p className="mt-12 text-neutral-600 italic">
              Replace these placeholders with behind-the-scenes photos of your workshop,
              crafting process, and finished pieces.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
