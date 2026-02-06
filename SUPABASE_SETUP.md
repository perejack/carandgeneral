# Supabase Integration Setup Guide

This guide will help you set up Supabase for your PowerDrive Showroom project with a full admin dashboard.

## Prerequisites

- Supabase account (you've already provided credentials)
- Node.js installed
- Git

## Step 1: Run the SQL Setup Script

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/dpcgsfsykmmizngbkykw
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `supabase-setup.sql` file from this project
5. Paste it into the SQL Editor
6. Click **Run** to execute the script

This will create:
- `categories` table
- `products` table
- Storage buckets for images (`product-images`, `category-images`)
- Row Level Security (RLS) policies
- Helper functions and triggers
- Initial seed data

## Step 2: Environment Variables

The `.env` file has already been created with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://dpcgsfsykmmizngbkykw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Install Dependencies

Dependencies have already been installed:
```bash
npm install @supabase/supabase-js
```

## Step 4: Start the Development Server

```bash
npm run dev
```

## Step 5: Access the Admin Dashboard

1. Navigate to `http://localhost:5173/admin`
2. Login with the default password: `admin123`
3. You can now manage:
   - **Categories**: Add, edit, delete categories with images
   - **Products**: Add, edit, delete products with images, features, and badges
   - **Featured Products**: Choose which products appear on the homepage

## Admin Dashboard Features

### Categories Management
- Add new categories with name, slug, icon, description, and image
- Edit existing categories
- Delete categories (with image cleanup)
- Upload category images directly to Supabase Storage
- Set display order

### Products Management
- Add new products with:
  - Name, category, price, description
  - Features list (one per line)
  - Product images
  - Badges (e.g., "Best Seller", "New")
  - Featured product toggle
  - Featured order for homepage display
- Edit existing products
- Delete products (with image cleanup)
- Upload product images directly to Supabase Storage

### Featured Products Management
- Drag-and-drop style ordering for featured products
- Add/remove products from featured list
- Maximum 6 featured products recommended for homepage

## Public Site Features

The public-facing site now:
- Fetches all data from Supabase in real-time
- Displays categories with images from database
- Shows featured products as configured in admin
- Displays all products by category
- Shows individual product details

## Security Notes

### Current Authentication
- Simple password-based authentication (default: `admin123`)
- Stored in localStorage
- **For production use**, implement proper authentication:
  - Use Supabase Auth with email/password
  - Add role-based access control
  - Implement session management

### Row Level Security (RLS)
- Public users can read all data
- Authenticated users can create/update/delete
- Storage policies allow authenticated users to upload images

## Customization

### Change Admin Password

Edit `src/lib/auth.ts`:
```typescript
export const login = (password: string): boolean => {
  if (password === 'YOUR_NEW_PASSWORD') {
    localStorage.setItem(ADMIN_PASSWORD_KEY, 'true');
    return true;
  }
  return false;
};
```

### Add More Fields to Products/Categories

1. Update the SQL schema in Supabase
2. Update TypeScript interfaces in `src/lib/supabase.ts`
3. Update forms in admin pages
4. Update API functions in `src/lib/api.ts`

## Troubleshooting

### Images Not Uploading
- Check Supabase Storage policies in dashboard
- Ensure bucket names match: `product-images`, `category-images`
- Check file size limits (currently 10MB)

### Data Not Loading
- Verify Supabase URL and anon key in `.env`
- Check browser console for errors
- Ensure SQL script was run successfully

### Admin Dashboard Not Accessible
- Clear localStorage and try logging in again
- Check that authentication is working in browser console

## Next Steps for Production

1. **Implement proper authentication** using Supabase Auth
2. **Add user roles** (admin, editor, viewer)
3. **Enable email verification** for users
4. **Set up proper backup** for Supabase database
5. **Configure CDN** for image storage
6. **Add analytics** for admin actions
7. **Implement audit logs** for changes

## File Structure

```
src/
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   ├── api.ts               # API functions for CRUD operations
│   └── auth.ts              # Authentication utilities
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.tsx          # Main dashboard layout
│   │   ├── CategoriesManagement.tsx     # Category CRUD
│   │   ├── ProductsManagement.tsx      # Product CRUD
│   │   └── FeaturedProductsManagement.tsx # Featured products
│   ├── CategoryPage.tsx      # Category listing page
│   └── ProductDetails.tsx    # Product detail page
├── components/
│   ├── AdminLogin.tsx        # Login component
│   ├── CategoriesSection.tsx # Categories display
│   └── FeaturedProducts.tsx  # Featured products display
└── data/
    └── products.ts          # Legacy data (can be removed)
```

## Support

For issues or questions:
1. Check Supabase dashboard for errors
2. Review browser console logs
3. Verify SQL script was executed successfully
4. Check that environment variables are set correctly
