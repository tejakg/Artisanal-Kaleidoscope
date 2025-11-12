# Artisanal Kaleidoscope Website

A beautiful, production-grade website with full admin panel for Artisanal Kaleidoscope, a Mysuru-based handmade jewelry brand specializing in silk-thread bangles, earrings, and custom artisan pieces.

## ✨ Features

### Design & User Experience
- 🎨 Warm, handcrafted aesthetic with earthy colors and silk-inspired gradients
- 🌊 Smooth micro-animations powered by Framer Motion
- 📱 Fully responsive design across all devices
- ♿ Accessible components with ARIA labels
- 🎭 Elegant typography combining Inter, Lora, and Playfair Display fonts

### Pages
- **Homepage**: Hero section, featured collections, best sellers, and CTAs
- **About**: Founder's story, values, craft process, and behind-the-scenes
- **Portfolio**: Responsive image grid with modal lightbox view
- **Collections**: Categorized products with detailed cards and customization options
- **Tutorials**: YouTube video embeds organized by playlists
- **Order**: Custom order form with WhatsApp, Instagram, and email integration

### Technical Features
- ⚡ Next.js 14 with App Router for optimal performance
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS with custom design system
- 🖼️ Optimized image loading with Next.js Image
- 🔍 SEO-optimized with metadata, OG tags, and sitemap
- 📊 Structured data ready for search engines
- 🔄 Lazy loading for improved performance
- 🎬 Smooth page transitions and animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Artisanal-Kaleidoscope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your configuration:
   ```env
   NEXT_PUBLIC_SITE_NAME="Artisanal Kaleidoscope"
   NEXT_PUBLIC_SITE_URL="https://your-domain.com"
   NEXT_PUBLIC_WHATSAPP_NUMBER="919876543210"
   NEXT_PUBLIC_EMAIL="hello@artisanalkaleidoscope.com"
   NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/your-handle"
   NEXT_PUBLIC_YOUTUBE_URL="https://youtube.com/@your-channel"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
artisanal-kaleidoscope/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with SEO
│   ├── page.tsx             # Homepage
│   ├── about/               # About page
│   ├── portfolio/           # Portfolio page
│   ├── collections/         # Collections page
│   ├── tutorials/           # Tutorials page
│   ├── order/               # Order page
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # Robots.txt
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── TextArea.tsx
│   │   └── Modal.tsx
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/               # Homepage components
│   ├── collections/        # Collections components
│   └── admin/              # Admin structure (future)
├── lib/                    # Utility functions
│   ├── utils.ts           # Helper functions
│   └── config.ts          # Site configuration
├── types/                  # TypeScript type definitions
│   └── index.ts
├── data/                   # Sample data
│   └── products.ts
├── public/                 # Static assets
│   ├── images/
│   └── fonts/
├── styles/                 # Additional styles
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: Earthy brown tones (#b08968)
- **Silk Colors**: Pink, Gold, Crimson, Teal, Lavender, Coral
- **Neutral**: Stone gray palette
- **Accent**: Soft green tones

### Typography
- **Display**: Playfair Display (headings)
- **Body**: Inter (content)
- **Serif**: Lora (accents)

### Components
All components follow a consistent design language with:
- Rounded corners (rounded-lg, rounded-xl)
- Soft shadows (shadow-soft)
- Smooth transitions (duration-300)
- Hover states with scale/translate effects

## 🛠️ Customization

### Adding Products
Edit `data/products.ts` to add or modify products:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  category: 'bangles', // or 'earrings', 'necklaces', etc.
  description: 'Product description',
  price: 1000, // or use priceRange
  images: ['/images/products/your-image.jpg'],
  materials: ['Silk thread', 'Stones'],
  craftsmanship: 'Crafting details',
  customizable: true,
  isBestSeller: true,
  isFeatured: true,
}
```

### Adding Portfolio Items
Edit `data/products.ts` portfolioItems array:

```typescript
{
  id: 'p-id',
  title: 'Item Title',
  description: 'Description',
  image: '/images/portfolio/image.jpg',
  category: 'bangles',
  tags: ['tag1', 'tag2'],
}
```

### Adding Tutorials
Edit `data/products.ts` tutorials array:

```typescript
{
  id: 't-id',
  title: 'Tutorial Title',
  description: 'Tutorial description',
  youtubeUrl: 'https://youtube.com/watch?v=VIDEO_ID',
  videoId: 'VIDEO_ID',
  playlist: 'Playlist Name',
  tags: ['beginner', 'bangles'],
}
```

### Updating Site Configuration
Edit `lib/config.ts` to update:
- Site name and tagline
- Contact information
- Social media links
- Navigation items

## 📸 Adding Images

### Product Images
1. Place images in `public/images/products/`
2. Use descriptive filenames: `bangles-silk-gold.jpg`
3. Recommended size: 1000x1000px (square)
4. Format: JPG or WebP for best performance

### Portfolio Images
1. Place images in `public/images/portfolio/`
2. Recommended size: 1200x1200px
3. High quality for modal view

### Hero/Banner Images
1. Place images in `public/images/`
2. Recommended size: 1920x1080px or larger
3. Use WebP format for faster loading

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms
This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

### Build for Production
```bash
npm run build
npm start
```

## 🔐 Environment Variables

Required environment variables for production:

```env
# Site Information
NEXT_PUBLIC_SITE_NAME="Artisanal Kaleidoscope"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NEXT_PUBLIC_SITE_DESCRIPTION="Your site description"

# Contact
NEXT_PUBLIC_WHATSAPP_NUMBER="919876543210"
NEXT_PUBLIC_EMAIL="hello@artisanalkaleidoscope.com"
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/handle"
NEXT_PUBLIC_YOUTUBE_URL="https://youtube.com/@channel"

# Optional: Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

## 🎯 SEO Optimization

The site includes:
- ✅ Semantic HTML structure
- ✅ Meta tags for all pages
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Structured data (JSON-LD) ready
- ✅ Sitemap.xml generation
- ✅ Robots.txt
- ✅ Web manifest for PWA support

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🔐 Admin Panel

A complete, production-ready admin panel is included! Manage all your content easily.

### Access
- **URL**: `/admin/login`
- **Email**: `admin@artisanalkaleidoscope.com`
- **Password**: `admin123`

### Features
- 📦 **Product Management**: Add, edit, delete products with image cropping
- 📸 **Portfolio Management**: Upload and manage showcase photos
- 🎥 **Tutorial Management**: Link and organize YouTube videos
- 🖼️ **Image Cropping**: Built-in crop/preview tool for all uploads
- 📊 **Dashboard**: Real-time statistics and quick actions
- 🔒 **Secure Authentication**: JWT-based auth with sessions
- 📱 **Mobile Responsive**: Full mobile support
- 💾 **Supabase Integration**: Free PostgreSQL database and storage

### Database Setup
The admin panel uses **Supabase** - a free, open-source Firebase alternative with:
- ✅ **500MB Database** (free tier)
- ✅ **1GB File Storage** (free tier)
- ✅ **Unlimited API Requests**
- ✅ **Real-time Updates**
- ✅ **Row Level Security**

**Setup in 5 minutes:** See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for step-by-step instructions.

### Documentation
- [ADMIN.md](./ADMIN.md) - Complete admin panel guide
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Database setup guide

## 🔮 Additional Features to Consider

### Recommended Integrations
- **CMS**: Sanity.io or Contentful for content management
- **E-commerce**: Stripe for payments
- **Auth**: NextAuth.js for admin authentication
- **Database**: Supabase or MongoDB for dynamic data
- **Email**: SendGrid or Resend for order notifications
- **Analytics**: Google Analytics or Plausible

## 🤝 Contributing

This is a custom project for Artisanal Kaleidoscope. For modifications or questions, contact the development team.

## 📄 License

Copyright © 2024 Artisanal Kaleidoscope. All rights reserved.

## 📞 Support

For technical support or questions:
- Email: [Your development team email]
- Create an issue in the repository

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
