/**
 * Type definitions for Artisanal Kaleidoscope
 */

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  images: string[];
  materials: string[];
  craftsmanship: string;
  customizable: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

export type ProductCategory =
  | 'bangles'
  | 'earrings'
  | 'necklaces'
  | 'custom-sets'
  | 'festive'
  | 'bridal'
  | 'rings'
  | 'accessories';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  products: Product[];
  image: string;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: ProductCategory;
  tags?: string[];
  order?: number;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  videoId: string;
  thumbnail?: string;
  playlist?: string;
  duration?: string;
  tags?: string[];
  order?: number;
}

export interface OrderInquiry {
  name: string;
  email: string;
  phone: string;
  productType: string;
  customization?: string;
  message: string;
  preferredContact: 'whatsapp' | 'email' | 'phone';
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    instagram: string;
    whatsapp: string;
    youtube: string;
    email: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  image?: string;
  date: string;
}
