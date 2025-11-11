'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ShoppingBag, MessageCircle, Instagram, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { siteConfig } from '@/lib/config';
import { getWhatsAppUrl } from '@/lib/utils';
import type { OrderInquiry } from '@/types';

const OrderPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<OrderInquiry>();

  const onSubmit = async (data: OrderInquiry) => {
    // In production, this would send to your backend API or email service
    console.log('Order inquiry:', data);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const productTypes = [
    'Silk Thread Bangles',
    'Earrings (Jhumkas/Studs)',
    'Necklaces',
    'Bridal Set',
    'Festive Collection',
    'Custom Design',
    'Other',
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Chat with us instantly',
      action: 'Message Now',
      link: getWhatsAppUrl(siteConfig.links.whatsapp, 'Hi! I would like to place a custom order.'),
      color: 'bg-green-500',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      description: 'DM us your requirements',
      action: 'Send DM',
      link: siteConfig.links.instagram,
      color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Send detailed inquiry',
      action: 'Email Us',
      link: `mailto:${siteConfig.contact.email}`,
      color: 'bg-primary-600',
    },
  ];

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
              <ShoppingBag className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">
                Place Your Order
              </span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">
              Let's Create{' '}
              <span className="gradient-text">Something Special</span>
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Ready to bring your vision to life? Fill out the form below or reach out
              directly through WhatsApp, Instagram, or email.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Order Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8">
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                  Custom Order Inquiry
                </h2>
                <p className="text-neutral-600 mb-8">
                  Tell us about your dream jewelry piece, and we'll get back to you within 24 hours.
                </p>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      Thank you! We'll contact you soon.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <Input
                    label="Your Name *"
                    placeholder="Enter your full name"
                    {...register('name', { required: 'Name is required' })}
                    error={errors.name?.message}
                  />

                  {/* Email */}
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    error={errors.email?.message}
                  />

                  {/* Phone */}
                  <Input
                    label="Phone Number *"
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register('phone', { required: 'Phone number is required' })}
                    error={errors.phone?.message}
                  />

                  {/* Product Type */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Product Type *
                    </label>
                    <select
                      {...register('productType', { required: 'Please select a product type' })}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                    >
                      <option value="">Select product type</option>
                      {productTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.productType && (
                      <p className="mt-1 text-sm text-red-600">{errors.productType.message}</p>
                    )}
                  </div>

                  {/* Customization Details */}
                  <TextArea
                    label="Customization Details (Optional)"
                    placeholder="Tell us about colors, designs, size preferences, occasion, or any special requirements..."
                    rows={4}
                    {...register('customization')}
                  />

                  {/* Message */}
                  <TextArea
                    label="Additional Message *"
                    placeholder="Any other details you'd like to share..."
                    rows={4}
                    {...register('message', { required: 'Please provide some details' })}
                    error={errors.message?.message}
                  />

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Preferred Contact Method *
                    </label>
                    <div className="space-y-2">
                      {['whatsapp', 'email', 'phone'].map((method) => (
                        <label key={method} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            value={method}
                            {...register('preferredContact', { required: 'Please select a contact method' })}
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-neutral-700 capitalize">{method}</span>
                        </label>
                      ))}
                    </div>
                    {errors.preferredContact && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredContact.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Send Inquiry
                  </Button>

                  <p className="text-sm text-neutral-600 text-center">
                    We typically respond within 24 hours during business days
                  </p>
                </form>
              </Card>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                  Quick Contact
                </h2>
                <p className="text-neutral-600 mb-6">
                  Prefer instant messaging? Reach out through your favorite platform.
                </p>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <a href={method.link} target="_blank" rel="noopener noreferrer">
                        <Card hover className="p-6 group">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <method.icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                                {method.title}
                              </h3>
                              <p className="text-neutral-600 text-sm">{method.description}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              {method.action}
                            </Button>
                          </div>
                        </Card>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <Card className="p-6 bg-gradient-warm">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Phone</p>
                      <a
                        href={`tel:${siteConfig.contact.phone}`}
                        className="text-neutral-900 hover:text-primary-600 transition-colors font-medium"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Email</p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-neutral-900 hover:text-primary-600 transition-colors font-medium break-all"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* FAQ Quick Links */}
              <Card className="p-6">
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                  Before You Order
                </h3>
                <ul className="space-y-3">
                  <li>
                    <p className="text-sm font-medium text-neutral-700">✓ Customization Options</p>
                    <p className="text-sm text-neutral-600">Colors, sizes, and designs can be fully customized</p>
                  </li>
                  <li>
                    <p className="text-sm font-medium text-neutral-700">✓ Delivery Time</p>
                    <p className="text-sm text-neutral-600">Typically 7-14 days for custom orders</p>
                  </li>
                  <li>
                    <p className="text-sm font-medium text-neutral-700">✓ Payment Options</p>
                    <p className="text-sm text-neutral-600">We'll discuss payment methods after confirming your order</p>
                  </li>
                  <li>
                    <p className="text-sm font-medium text-neutral-700">✓ Shipping</p>
                    <p className="text-sm text-neutral-600">Available across India with secure packaging</p>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
