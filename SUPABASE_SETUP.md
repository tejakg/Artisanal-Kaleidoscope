# Supabase Setup Guide

This guide will help you set up Supabase as your database and storage solution.

## Why Supabase?

✅ **Free Tier Includes:**
- 500MB Database Storage
- 1GB File Storage
- 2GB Bandwidth
- Unlimited API Requests
- Row Level Security
- Real-time subscriptions
- Authentication (optional)

## Step-by-Step Setup

### 1. Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Verify your email address

### 2. Create a New Project

1. Click "New Project"
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name**: `artisanal-kaleidoscope` (or your choice)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., Mumbai for India)
   - **Pricing Plan**: Free

4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

### 3. Get Your API Keys

1. Go to **Settings** (gear icon) → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (⚠️ Keep this secret!)

### 4. Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"
   JWT_SECRET="generate-a-random-string"
   ```

3. Generate a secure JWT secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### 5. Create Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql`
4. Paste it into the SQL editor
5. Click "Run" or press `Ctrl/Cmd + Enter`
6. You should see: "Success. No rows returned"

### 6. Set Up Storage Buckets

#### Create Products Bucket:
1. Go to **Storage** in sidebar
2. Click "Create a new bucket"
3. Name: `products`
4. Make it **Public**
5. Click "Create bucket"

#### Create Portfolio Bucket:
1. Click "Create a new bucket" again
2. Name: `portfolio`
3. Make it **Public**
4. Click "Create bucket"

#### Configure Storage Policies:
1. Click on the `products` bucket
2. Go to "Policies" tab
3. Click "New Policy"
4. Use these policies (or run the SQL commands from `supabase-schema.sql`):

**For Public Read:**
```sql
-- Anyone can view images
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');
```

**For Authenticated Upload:**
```sql
-- Authenticated users can upload
CREATE POLICY "Authenticated upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');
```

**For Authenticated Delete:**
```sql
-- Authenticated users can delete
CREATE POLICY "Authenticated delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'products' AND auth.role() = 'authenticated');
```

5. Repeat for `portfolio` bucket

### 7. Verify Setup

Run these queries in SQL Editor to verify:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Check policies
SELECT * FROM pg_policies;

-- Test insert (should work)
INSERT INTO products (name, category, description, materials, craftsmanship)
VALUES ('Test Product', 'bangles', 'Test description', ARRAY['silk'], 'Handmade');

-- Check data
SELECT * FROM products;

-- Clean up test
DELETE FROM products WHERE name = 'Test Product';
```

### 8. Update Your Code (Already Done!)

The codebase is already configured to use Supabase. Just set your environment variables and you're good to go!

**What's been updated:**
- ✅ `lib/supabase/client.ts` - Supabase client configuration
- ✅ `lib/supabase/store.ts` - Database operations
- ✅ `lib/supabase/storage.ts` - File uploads
- ✅ `lib/supabase/types.ts` - TypeScript types

### 9. Test the Admin Panel

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `http://localhost:3000/admin/login`

3. Login with default credentials:
   - Email: `admin@artisanalkaleidoscope.com`
   - Password: `admin123`

4. Try adding a product:
   - Go to Products → Add Product
   - Fill in the form
   - Upload an image
   - Click "Create Product"

5. Check Supabase Dashboard:
   - Go to **Table Editor** → `products`
   - You should see your new product!
   - Go to **Storage** → `products`
   - You should see your uploaded image!

## Switching from File Storage to Supabase

The admin panel now uses Supabase automatically if environment variables are set!

If you want to migrate existing data:

1. **Export existing data** from `data/admin/*.json`
2. **Import to Supabase** using SQL Editor:

```sql
-- Example: Import products
INSERT INTO products (name, category, description, price, images, materials, craftsmanship)
VALUES
  ('Product 1', 'bangles', 'Description', 1000, ARRAY['/path/to/image.jpg'], ARRAY['silk'], 'Handmade'),
  ('Product 2', 'earrings', 'Description', 800, ARRAY['/path/to/image.jpg'], ARRAY['silk'], 'Handmade');
```

## Troubleshooting

### Error: "Missing Supabase environment variables"
**Solution**: Make sure `.env.local` exists and has all required variables.

### Error: "Invalid API key"
**Solution**: Double-check you copied the correct keys from Supabase Dashboard → Settings → API.

### Images not uploading
**Solution**:
1. Verify storage buckets are created and public
2. Check storage policies are set up
3. Ensure service role key is set in `.env.local`

### Database queries failing
**Solution**:
1. Check tables exist (run schema.sql again)
2. Verify Row Level Security policies are set
3. Check network connection

### "auth.role() is not authenticated"
**Solution**: The app uses service role key for admin operations, so you don't need Supabase Auth. Just make sure `SUPABASE_SERVICE_ROLE_KEY` is set.

## Production Checklist

Before deploying:

- [ ] Set up proper database backups
- [ ] Enable database connection pooling
- [ ] Set up monitoring and alerts
- [ ] Review and tighten RLS policies
- [ ] Set up CDN for images (optional)
- [ ] Enable database point-in-time recovery
- [ ] Set up staging environment
- [ ] Test all CRUD operations
- [ ] Verify file uploads work
- [ ] Check API rate limits

## Cost Estimation

**Free Tier Limits:**
- Database: 500MB (approx. 10,000+ products)
- Storage: 1GB (approx. 200-400 high-res images)
- Bandwidth: 2GB/month

**If you exceed free tier:**
- Pro Plan: $25/month
  - 8GB database
  - 100GB storage
  - 50GB bandwidth
  - Daily backups

**Tips to stay within free tier:**
- Optimize images before upload (compress, resize)
- Use WebP format
- Delete unused images
- Monitor usage in Supabase Dashboard

## Advanced Features (Optional)

### Enable Real-time Updates
```typescript
// Listen to product changes
supabase
  .channel('products')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'products' },
    (payload) => console.log('Change received!', payload)
  )
  .subscribe()
```

### Add Full-Text Search
```sql
-- Add search column
ALTER TABLE products ADD COLUMN search_vector tsvector;

-- Update search vector
UPDATE products SET search_vector =
  to_tsvector('english', name || ' ' || description);

-- Create index
CREATE INDEX products_search_idx ON products USING GIN(search_vector);

-- Search query
SELECT * FROM products
WHERE search_vector @@ to_tsquery('english', 'silk & bangles');
```

### Set Up Database Backups
1. Go to **Database** → **Backups**
2. Enable "Point in Time Recovery" (paid plans)
3. Or use pg_dump for manual backups:
   ```bash
   pg_dump -h db.your-project.supabase.co -U postgres > backup.sql
   ```

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Configure environment variables
3. ✅ Run database schema
4. ✅ Create storage buckets
5. ✅ Test the admin panel
6. 🚀 Start adding your products!

---

Need help? Check the [main documentation](./README.md) or [admin panel guide](./ADMIN.md).
