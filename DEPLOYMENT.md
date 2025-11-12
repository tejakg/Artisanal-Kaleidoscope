# Deployment Guide

Complete guide to deploying Artisanal Kaleidoscope to production.

## Prerequisites

- [ ] Supabase project set up (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
- [ ] All environment variables configured
- [ ] Database schema applied
- [ ] Storage buckets created
- [ ] Admin credentials changed

## Recommended: Deploy to Vercel

Vercel is the easiest and fastest way to deploy Next.js apps.

### Step 1: Prepare Your Repository

1. Ensure all changes are committed to Git
2. Push to GitHub/GitLab/Bitbucket

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your repository
4. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_NAME=Artisanal Kaleidoscope
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_DESCRIPTION=Handcrafted silk-thread jewelry from Mysuru

# Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_EMAIL=hello@artisanalkaleidoscope.com
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/your-handle
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@your-channel

# Supabase (CRITICAL!)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin
JWT_SECRET=your-secure-random-string
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your site is live! 🎉

### Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Alternative: Self-Hosted Deployment

### Option 1: VPS (DigitalOcean, Linode, etc.)

1. **Install Node.js 18+:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and build:**
   ```bash
   git clone your-repo-url
   cd Artisanal-Kaleidoscope
   npm install
   npm run build
   ```

3. **Set up environment variables:**
   ```bash
   nano .env.local
   # Add all env vars from .env.example
   ```

4. **Run with PM2:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "artisanal-kaleidoscope" -- start
   pm2 save
   pm2 startup
   ```

5. **Set up Nginx reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable HTTPS with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 2: Docker

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["npm", "start"]
   ```

2. **Build and run:**
   ```bash
   docker build -t artisanal-kaleidoscope .
   docker run -p 3000:3000 --env-file .env.local artisanal-kaleidoscope
   ```

## Post-Deployment Checklist

### Security
- [ ] Changed admin password
- [ ] Set secure JWT_SECRET
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Supabase RLS policies reviewed
- [ ] Rate limiting configured (Vercel does this automatically)

### Testing
- [ ] Public website loads correctly
- [ ] Admin panel accessible at `/admin/login`
- [ ] Can login to admin panel
- [ ] Can create products
- [ ] Image uploads work
- [ ] Portfolio items display correctly
- [ ] Tutorials load from YouTube
- [ ] Order form submits
- [ ] Mobile responsive works

### SEO & Analytics
- [ ] Google Search Console verification
- [ ] Sitemap submitted to search engines
- [ ] Google Analytics set up (if using)
- [ ] Social media meta tags verified
- [ ] Open Graph images set

### Performance
- [ ] Images optimized and compressed
- [ ] Lighthouse score checked (aim for 90+)
- [ ] Core Web Vitals passing
- [ ] CDN enabled (Vercel does this automatically)

### Monitoring
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Uptime monitoring (UptimeRobot, etc.)
- [ ] Supabase usage monitored
- [ ] Regular database backups scheduled

## Troubleshooting

### Build Fails

**Error: "Missing environment variables"**
```bash
# Solution: Add all required env vars in Vercel dashboard
# Check .env.example for required variables
```

**Error: "Cannot find module"**
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Runtime Issues

**Admin panel shows "Unauthorized"**
- Check JWT_SECRET is set
- Clear browser cookies
- Verify login credentials

**Images not uploading**
- Verify Supabase storage buckets exist
- Check SUPABASE_SERVICE_ROLE_KEY is set
- Ensure buckets are public
- Check storage policies

**Database queries failing**
- Verify Supabase credentials
- Check database schema is applied
- Review RLS policies
- Check Supabase project status

### Performance Issues

**Slow loading times**
- Enable Vercel Edge Network
- Optimize images (compress, resize)
- Enable caching headers
- Use Next.js Image component

**High database usage**
- Add database indexes (already included)
- Optimize queries
- Enable connection pooling
- Consider upgrading Supabase plan

## Scaling

### When to Upgrade

**Free Tier Limits:**
- Database: 500MB
- Storage: 1GB
- Bandwidth: 2GB/month

**Signs you need to upgrade:**
- Approaching storage limits
- Slow query performance
- Need more bandwidth
- Want automated backups

### Upgrade Path

1. **Supabase Pro ($25/month):**
   - 8GB database
   - 100GB storage
   - 50GB bandwidth
   - Daily backups
   - Better support

2. **Vercel Pro ($20/month):**
   - Unlimited sites
   - Custom domains
   - Advanced analytics
   - Password protection

### Optimization Tips

1. **Images:**
   - Compress before upload
   - Use WebP format
   - Lazy load images
   - Use CDN

2. **Database:**
   - Regular cleanup of unused data
   - Archive old records
   - Optimize queries
   - Use proper indexes

3. **Caching:**
   - Enable ISR (Incremental Static Regeneration)
   - Cache API responses
   - Use SWR for client-side data

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Deployment Issues](https://github.com/vercel/next.js/discussions)

## Backup & Recovery

### Automated Backups (Recommended)

1. **Enable Supabase Backups** (Pro plan):
   - Daily automatic backups
   - Point-in-time recovery
   - 7-day retention

2. **Manual Database Backup:**
   ```bash
   # Export database
   pg_dump -h db.your-project.supabase.co \
           -U postgres \
           -d postgres \
           > backup-$(date +%Y%m%d).sql

   # Restore database
   psql -h db.your-project.supabase.co \
        -U postgres \
        -d postgres \
        < backup.sql
   ```

3. **Storage Backup:**
   ```bash
   # Use Supabase CLI or API to download all storage files
   # Or use a script to sync to S3/backblaze
   ```

### Disaster Recovery Plan

1. Database corrupted:
   - Restore from Supabase backup
   - Or import from SQL dump

2. Storage lost:
   - Restore from backup
   - Re-upload from local copies

3. Complete site down:
   - Redeploy from Git
   - Restore database
   - Restore storage
   - Update DNS if needed

## Cost Estimation

### Typical Monthly Costs

**Minimal (Free Tier):**
- Vercel: $0
- Supabase: $0
- Domain: ~$10/year
- **Total: ~$1/month**

**Growing Business:**
- Vercel Pro: $20
- Supabase Pro: $25
- Domain: ~$10/year
- **Total: ~$46/month**

**Established:**
- Vercel Enterprise: $150+
- Supabase Team: $599+
- CDN: $50+
- **Total: $800+/month**

---

Need help? Check:
- [Main README](./README.md)
- [Admin Guide](./ADMIN.md)
- [Supabase Setup](./SUPABASE_SETUP.md)
