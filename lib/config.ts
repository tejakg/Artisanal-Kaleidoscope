import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Artisanal Kaleidoscope',
  tagline: 'Handcrafted Stories in Silk & Thread',
  description: 'Discover exquisite handmade silk-thread jewelry from Mysuru. Each piece tells a story of tradition, craftsmanship, and artistic passion. Bangles, earrings, necklaces, and custom creations made with love.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://artisanalkaleidoscope.com',
  ogImage: '/images/og-image.jpg',
  links: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/artisanalkaleidoscope',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@artisanalkaleidoscope',
    email: process.env.NEXT_PUBLIC_EMAIL || 'hello@artisanalkaleidoscope.com',
  },
  contact: {
    phone: '+91 98765 43210',
    email: 'hello@artisanalkaleidoscope.com',
    address: 'Mysuru, Karnataka, India',
  },
};

export const navItems = [
  {
    title: 'Home',
    href: '/',
    description: 'Discover our handcrafted collections',
  },
  {
    title: 'About',
    href: '/about',
    description: 'Our story and craftsmanship',
  },
  {
    title: 'Portfolio',
    href: '/portfolio',
    description: 'Browse our finished creations',
  },
  {
    title: 'Collections',
    href: '/collections',
    description: 'Explore our product categories',
  },
  {
    title: 'Tutorials',
    href: '/tutorials',
    description: 'Learn our craft',
  },
  {
    title: 'Order',
    href: '/order',
    description: 'Place a custom order',
  },
];
