import { Product, Collection, PortfolioItem, Tutorial } from '@/types';

/**
 * Sample products - Replace with actual data from CMS/database
 */
export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Thread Bangles - Classic Set',
    category: 'bangles',
    description: 'Elegant silk thread bangles handcrafted with intricate patterns. Perfect for daily wear or special occasions.',
    priceRange: { min: 500, max: 1500 },
    images: ['/images/products/bangles-classic-1.jpg'],
    materials: ['Silk thread', 'Metal base', 'Stone embellishments'],
    craftsmanship: 'Each bangle is carefully wrapped with premium silk threads and adorned with hand-placed stones.',
    customizable: true,
    isBestSeller: true,
    isFeatured: true,
    tags: ['bangles', 'silk-thread', 'classic', 'customizable'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jhumka Earrings - Traditional',
    category: 'earrings',
    description: 'Beautiful traditional jhumka earrings crafted with silk threads and embellished with stones.',
    price: 800,
    images: ['/images/products/earrings-jhumka-1.jpg'],
    materials: ['Silk thread', 'Brass hooks', 'Crystal stones'],
    craftsmanship: 'Handwoven silk threads formed into traditional jhumka shape with delicate stone work.',
    customizable: true,
    isFeatured: true,
    tags: ['earrings', 'jhumka', 'traditional'],
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Bridal Necklace Set',
    category: 'bridal',
    description: 'Stunning bridal necklace set with matching earrings. A masterpiece of silk thread artistry.',
    priceRange: { min: 3500, max: 8000 },
    images: ['/images/products/bridal-set-1.jpg'],
    materials: ['Premium silk thread', 'Gold-plated base', 'Kundan stones', 'Pearls'],
    craftsmanship: 'An intricate design requiring 15-20 hours of detailed handwork, featuring traditional motifs.',
    customizable: true,
    isFeatured: true,
    tags: ['bridal', 'necklace', 'premium', 'custom'],
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Festive Bangles - Golden Glory',
    category: 'festive',
    description: 'Radiant golden bangles perfect for festivals and celebrations.',
    priceRange: { min: 800, max: 2000 },
    images: ['/images/products/festive-bangles-gold.jpg'],
    materials: ['Golden silk thread', 'Metallic base', 'Sequins'],
    craftsmanship: 'Rich golden threads woven with shimmering sequins for a festive look.',
    customizable: true,
    isBestSeller: true,
    tags: ['bangles', 'festive', 'golden'],
    createdAt: '2024-02-10',
  },
];

/**
 * Product collections organized by category
 */
export const collections: Collection[] = [
  {
    id: 'bangles',
    name: 'Silk Thread Bangles',
    slug: 'bangles',
    description: 'Our signature collection of handcrafted silk thread bangles in various colors and designs.',
    category: 'bangles',
    products: products.filter(p => p.category === 'bangles'),
    image: '/images/collections/bangles-collection.jpg',
    featured: true,
  },
  {
    id: 'earrings',
    name: 'Artisan Earrings',
    slug: 'earrings',
    description: 'From traditional jhumkas to modern studs, each pair tells a unique story.',
    category: 'earrings',
    products: products.filter(p => p.category === 'earrings'),
    image: '/images/collections/earrings-collection.jpg',
    featured: true,
  },
  {
    id: 'bridal',
    name: 'Bridal Collection',
    slug: 'bridal',
    description: 'Exquisite bridal jewelry sets crafted for your special day.',
    category: 'bridal',
    products: products.filter(p => p.category === 'bridal'),
    image: '/images/collections/bridal-collection.jpg',
    featured: true,
  },
  {
    id: 'festive',
    name: 'Festive Designs',
    slug: 'festive',
    description: 'Celebrate every festival with our vibrant, handcrafted jewelry.',
    category: 'festive',
    products: products.filter(p => p.category === 'festive'),
    image: '/images/collections/festive-collection.jpg',
  },
  {
    id: 'custom',
    name: 'Custom Creations',
    slug: 'custom-sets',
    description: 'Work with us to create your perfect, personalized piece.',
    category: 'custom-sets',
    products: [],
    image: '/images/collections/custom-collection.jpg',
  },
];

/**
 * Portfolio items for gallery
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Peacock Motif Bangles',
    description: 'Intricate peacock design with green and gold silk threads',
    image: '/images/portfolio/peacock-bangles.jpg',
    category: 'bangles',
    tags: ['bangles', 'peacock', 'traditional'],
    order: 1,
  },
  {
    id: 'p2',
    title: 'Crystal Drop Earrings',
    description: 'Elegant drop earrings with crystal embellishments',
    image: '/images/portfolio/crystal-earrings.jpg',
    category: 'earrings',
    tags: ['earrings', 'crystal', 'elegant'],
    order: 2,
  },
  {
    id: 'p3',
    title: 'Royal Bridal Set',
    description: 'Complete bridal jewelry set with necklace, earrings, and maang tikka',
    image: '/images/portfolio/royal-bridal.jpg',
    category: 'bridal',
    tags: ['bridal', 'premium', 'complete-set'],
    order: 3,
  },
];

/**
 * Tutorial videos
 */
export const tutorials: Tutorial[] = [
  {
    id: 't1',
    title: 'How to Make Basic Silk Thread Bangles',
    description: 'Learn the fundamentals of creating beautiful silk thread bangles from scratch.',
    youtubeUrl: 'https://youtube.com/watch?v=example1',
    videoId: 'example1',
    playlist: 'Beginner Tutorials',
    duration: '15:30',
    tags: ['beginner', 'bangles', 'basics'],
    order: 1,
  },
  {
    id: 't2',
    title: 'Advanced Stone Setting Techniques',
    description: 'Master the art of setting stones perfectly on silk thread jewelry.',
    youtubeUrl: 'https://youtube.com/watch?v=example2',
    videoId: 'example2',
    playlist: 'Advanced Techniques',
    duration: '22:45',
    tags: ['advanced', 'stones', 'techniques'],
    order: 2,
  },
  {
    id: 't3',
    title: 'Creating Jhumka Earrings',
    description: 'Step-by-step guide to crafting traditional jhumka earrings.',
    youtubeUrl: 'https://youtube.com/watch?v=example3',
    videoId: 'example3',
    playlist: 'Earring Tutorials',
    duration: '18:20',
    tags: ['earrings', 'jhumka', 'intermediate'],
    order: 3,
  },
];

/**
 * Helper function to get products by category
 */
export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

/**
 * Helper function to get featured products
 */
export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

/**
 * Helper function to get best sellers
 */
export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller);
}
