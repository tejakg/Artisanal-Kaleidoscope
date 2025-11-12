-- Supabase Database Schema for Artisanal Kaleidoscope
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2),
  price_min DECIMAL(10, 2),
  price_max DECIMAL(10, 2),
  images TEXT[] NOT NULL DEFAULT '{}',
  materials TEXT[] NOT NULL DEFAULT '{}',
  craftsmanship TEXT NOT NULL,
  customizable BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tutorials Table
CREATE TABLE IF NOT EXISTS tutorials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  video_id TEXT NOT NULL,
  playlist TEXT,
  duration TEXT,
  tags TEXT[],
  "order" INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(is_best_seller) WHERE is_best_seller = true;
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio(category);
CREATE INDEX IF NOT EXISTS idx_tutorials_playlist ON tutorials(playlist);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (anyone can view)
CREATE POLICY "Public read access for products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public read access for portfolio" ON portfolio
  FOR SELECT USING (true);

CREATE POLICY "Public read access for tutorials" ON tutorials
  FOR SELECT USING (true);

-- Admin write access (authenticated users can insert/update/delete)
-- Note: You'll need to set up proper authentication rules in Supabase
CREATE POLICY "Authenticated users can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert portfolio" ON portfolio
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio" ON portfolio
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio" ON portfolio
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert tutorials" ON tutorials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update tutorials" ON tutorials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete tutorials" ON tutorials
  FOR DELETE USING (auth.role() = 'authenticated');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for products table
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Storage buckets for images (run these commands in Supabase Storage section)
-- 1. Create a bucket called "products" with public access
-- 2. Create a bucket called "portfolio" with public access
-- 3. Set up the following storage policies:

/*
-- Storage Policies (apply in Supabase Dashboard -> Storage -> Policies)

-- Allow public to read images
CREATE POLICY "Public read access for products bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

CREATE POLICY "Public read access for portfolio bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload to products"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload to portfolio"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete from products"
ON storage.objects FOR DELETE
USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete from portfolio"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
*/

-- Verification queries
-- Run these to verify your setup:

-- SELECT * FROM products;
-- SELECT * FROM portfolio;
-- SELECT * FROM tutorials;
