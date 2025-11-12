# Admin Panel Documentation

## 🔐 Accessing the Admin Panel

### Login Credentials
- **URL**: `http://localhost:3000/admin/login` (or `/admin/login` on your domain)
- **Email**: `admin@artisanalkaleidoscope.com`
- **Password**: `admin123`

> ⚠️ **Important**: Change these credentials in production! See [Security](#security) section.

## 📋 Features

### Dashboard
- Overview statistics for products, portfolio items, and tutorials
- Quick action buttons to add new content
- Real-time data from the system

### Product Management
- **Add Products**: Upload images with crop/preview functionality
- **Edit Products**: Modify product details, pricing, and images
- **Delete Products**: Remove products from the catalog
- **Features**:
  - Multiple image upload with cropping tool
  - Fixed price or price range options
  - Material and craftsmanship details
  - Category organization
  - Tags for better search
  - Featured/Best Seller flags
  - Customization options

### Portfolio Management
- **Add Portfolio Items**: Upload showcase photos
- **Delete Portfolio Items**: Remove from gallery
- **Features**:
  - Image cropping with 1:1 aspect ratio
  - Category assignment
  - Tag support
  - Description fields

### Tutorial Management
- **Add Tutorials**: Link YouTube videos
- **Delete Tutorials**: Remove from tutorial list
- **Features**:
  - Automatic YouTube video ID extraction
  - Playlist organization
  - Duration and tag support
  - Video preview in admin panel

## 🖼️ Image Upload & Cropping

The admin panel includes a powerful image cropping tool:

1. **Click to upload** an image (PNG, JPG, WebP up to 5MB)
2. **Drag to adjust** the crop area
3. **Click "Crop & Upload"** to save

Features:
- Real-time crop preview
- Aspect ratio control (1:1 for portfolio, flexible for products)
- Image optimization
- Automatic upload to `/public/uploads/`

## 📁 Data Storage

Currently uses **file-based storage** for simplicity:
- Products: `data/admin/products.json`
- Portfolio: `data/admin/portfolio.json`
- Tutorials: `data/admin/tutorials.json`
- Images: `public/uploads/`

### Migrating to Database

For production, consider migrating to a database:

1. **Install Prisma** (recommended):
```bash
npm install prisma @prisma/client
npx prisma init
```

2. **Update store files** in `lib/admin/store.ts` to use Prisma instead of file system

3. **Example Prisma schema**:
```prisma
model Product {
  id            String   @id @default(cuid())
  name          String
  category      String
  description   String
  price         Float?
  images        String[]
  materials     String[]
  craftsmanship String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 🔒 Security

### Change Default Credentials

1. **Update password hash** in `lib/admin/auth.ts`:
```typescript
// Generate new hash
import bcrypt from 'bcryptjs';
const hash = await bcrypt.hash('your-new-password', 10);
console.log(hash);
```

2. **Update the users array**:
```typescript
export const users = [
  {
    id: '1',
    email: 'your-email@example.com',
    password: 'your-generated-hash',
    role: 'admin' as const,
  },
];
```

### Set JWT Secret

Update `.env.local`:
```env
JWT_SECRET=your-very-secure-random-string-here
```

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Production Checklist

- [ ] Change admin credentials
- [ ] Set secure JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add database with proper indexes
- [ ] Set up backups
- [ ] Configure CORS properly
- [ ] Add input validation
- [ ] Set up logging
- [ ] Add 2FA (optional)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product (auth required)
- `GET /api/products/[id]` - Get product
- `PUT /api/products/[id]` - Update product (auth required)
- `DELETE /api/products/[id]` - Delete product (auth required)

### Portfolio
- `GET /api/portfolio` - List all items
- `POST /api/portfolio` - Create item (auth required)
- `PUT /api/portfolio/[id]` - Update item (auth required)
- `DELETE /api/portfolio/[id]` - Delete item (auth required)

### Tutorials
- `GET /api/tutorials` - List all tutorials
- `POST /api/tutorials` - Create tutorial (auth required)
- `PUT /api/tutorials/[id]` - Update tutorial (auth required)
- `DELETE /api/tutorials/[id]` - Delete tutorial (auth required)

### Upload
- `POST /api/upload` - Upload image (auth required)
  - Form data: `file` or `base64`
  - Query param: `folder` (products/portfolio/other)

## 🚀 Usage

### Adding a Product

1. Navigate to **Admin → Products → Add Product**
2. Fill in basic information (name, category, description)
3. Set pricing (fixed or range)
4. Upload and crop product images
5. Add materials and craftsmanship details
6. Set tags and options
7. Click **Create Product**

### Adding Portfolio Items

1. Navigate to **Admin → Portfolio → Add Item**
2. Upload and crop image (1:1 aspect ratio)
3. Add title and description
4. Select category
5. Add tags
6. Click **Add to Portfolio**

### Adding Tutorials

1. Navigate to **Admin → Tutorials → Add Tutorial**
2. Paste YouTube URL
3. Add title and description
4. Organize into playlist (optional)
5. Add duration and tags
6. Click **Add Tutorial**

## 📱 Mobile Support

The admin panel is fully responsive:
- Mobile-friendly navigation
- Touch-optimized image cropping
- Responsive forms and tables
- Sidebar navigation for mobile

## 🛠️ Customization

### Adding New Fields

1. **Update type** in `types/index.ts`:
```typescript
export interface Product {
  // ... existing fields
  newField: string;
}
```

2. **Update API route** in `app/api/products/route.ts`

3. **Update form** in `app/admin/products/new/page.tsx`

### Adding New Roles

1. Update `AuthUser` interface in `lib/admin/auth.ts`
2. Add role-based permission checks
3. Update middleware as needed

## 🔍 Troubleshooting

### Images not uploading
- Check `public/uploads/` directory permissions
- Verify file size < 5MB
- Ensure correct image format (PNG, JPG, WebP)

### Authentication not working
- Clear browser cookies
- Check JWT_SECRET is set
- Verify credentials in `lib/admin/auth.ts`

### Data not saving
- Check `data/admin/` directory exists
- Verify write permissions
- Check for JSON syntax errors

## 📊 Future Enhancements

Planned features for the admin panel:

- [ ] Bulk product upload (CSV import)
- [ ] Image gallery management
- [ ] Order inquiry management dashboard
- [ ] Analytics and reporting
- [ ] Multi-user support with permissions
- [ ] Activity logs
- [ ] Content scheduling
- [ ] SEO optimization tools
- [ ] Backup/restore functionality
- [ ] Email notification settings

## 💡 Tips

- Use descriptive product names and tags for better SEO
- Always preview images after cropping
- Organize tutorials into playlists for better UX
- Set featured products strategically
- Keep descriptions concise and engaging
- Use high-quality images (minimum 1000x1000px)

## 📞 Support

For issues or questions about the admin panel:
1. Check this documentation
2. Review the [main README](./README.md)
3. Check API endpoint responses for errors
4. Review browser console for client-side errors

---

Built with ❤️ for Artisanal Kaleidoscope
