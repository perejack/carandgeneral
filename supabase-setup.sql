-- ============================================
-- POWERDRIVE SHOWROOM - SUPABASE SETUP SCRIPT
-- ============================================
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for category images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'category-images',
  'category-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- TABLES
-- ============================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT 'Package',
  description TEXT,
  image_url TEXT,
  image_path TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_slug TEXT NOT NULL,
  category_name TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  image_path TEXT,
  badge TEXT,
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_category_slug ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_featured_order ON products(featured_order) WHERE is_featured = true;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES FOR CATEGORIES
-- ============================================

-- Public can read categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Public can insert categories (admin functionality)
CREATE POLICY "Public can create categories"
  ON categories FOR INSERT
  WITH CHECK (true);

-- Public can update categories
CREATE POLICY "Public can update categories"
  ON categories FOR UPDATE
  USING (true);

-- Public can delete categories
CREATE POLICY "Public can delete categories"
  ON categories FOR DELETE
  USING (true);

-- ============================================
-- RLS POLICIES FOR PRODUCTS
-- ============================================

-- Public can read products
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- Public can insert products
CREATE POLICY "Public can create products"
  ON products FOR INSERT
  WITH CHECK (true);

-- Public can update products
CREATE POLICY "Public can update products"
  ON products FOR UPDATE
  USING (true);

-- Public can delete products
CREATE POLICY "Public can delete products"
  ON products FOR DELETE
  USING (true);

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Public can view all images
CREATE POLICY "Public images are viewable by everyone"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('product-images', 'category-images'));

-- Public can upload images
CREATE POLICY "Public can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN ('product-images', 'category-images')
  );

-- Public can update images
CREATE POLICY "Public can update images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id IN ('product-images', 'category-images')
  );

-- Public can delete images
CREATE POLICY "Public can delete images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id IN ('product-images', 'category-images')
  );

-- ============================================
-- FUNCTIONS & TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for categories
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Triggers for products
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA SEEDING
-- ============================================

-- Insert categories
INSERT INTO categories (name, slug, icon, description, display_order) VALUES
  ('Air Compressors', 'air-compressors', 'Wind', 'Industrial & portable air compressors for every need', 1),
  ('Commercial Laundry Equipment', 'commercial-laundry', 'WashingMachine', 'Professional laundry solutions for businesses', 2),
  ('Construction Equipment', 'construction-equipment', 'HardHat', 'Heavy-duty construction machinery & tools', 3),
  ('Material Handling Equipment', 'material-handling', 'Package', 'Forklifts, pallet jacks & warehouse solutions', 4),
  ('Motorcycles', 'motorcycles', 'Bike', 'Reliable motorcycles for personal & commercial use', 5),
  ('Outboard & Inboard Engines', 'engines', 'Anchor', 'Marine engines for boats & watercraft', 6),
  ('Generators', 'generators', 'Zap', 'Power generators for home, office & industrial use', 7),
  ('Lawn & Yard', 'lawn-yard', 'TreePine', 'Lawn mowers, trimmers & garden equipment', 8),
  ('Water Pumps', 'water-pumps', 'Droplets', 'Submersible, centrifugal & irrigation pumps', 9),
  ('Three Wheelers', 'three-wheelers', 'Car', 'Commercial three-wheelers for transport & delivery', 10),
  ('Tractors & Implements', 'tractors', 'Tractor', 'Agricultural tractors & farming implements', 11),
  ('Fitness Watches & GPS Devices', 'fitness-gps', 'Watch', 'Smart fitness trackers & GPS navigation', 12),
  ('Tyres', 'tyres', 'Circle', 'Quality tyres for all vehicle types', 13),
  ('Industrial Motors', 'industrial-motors', 'Cog', 'Electric motors for industrial applications', 14),
  ('Automobile Oil', 'automobile-oil', 'Fuel', 'Premium engine oils & lubricants', 15)
ON CONFLICT (name) DO NOTHING;

-- Insert sample products (you can update these later from admin dashboard)
INSERT INTO products (name, category_slug, category_name, price, description, features, badge, is_featured, featured_order, display_order) VALUES
  ('CG Sport 150cc', 'motorcycles', 'Motorcycles', 'KES 185,000',
   'A powerful and fuel-efficient 150cc motorcycle built for both city commuting and highway cruising. Features a 4-stroke engine, electric start, and disc brakes for reliable performance.',
   '["150cc 4-stroke engine", "Electric & kick start", "Front disc brake", "14L fuel tank", "Tubeless tyres", "LED headlamp"]',
   'Best Seller', true, 1, 1),
  ('CG Cruiser 200cc', 'motorcycles', 'Motorcycles', 'KES 265,000',
   'A heavy-duty 200cc cruiser motorcycle with premium suspension, powerful braking, and a comfortable riding position for long-distance travel.',
   '["200cc engine", "Dual disc brakes", "Digital dashboard", "USB charging port", "Alloy wheels", "5-speed transmission"]',
   NULL, false, NULL, 2),
  ('CG Commuter 125cc', 'motorcycles', 'Motorcycles', 'KES 135,000',
   'The perfect economical commuter bike with excellent fuel efficiency and low maintenance costs. Ideal for daily urban riding.',
   '["125cc engine", "Kick & electric start", "Drum brakes", "12L fuel tank", "Spoke wheels", "4-speed gear"]',
   NULL, false, NULL, 3),
  ('PowerMax 5000W Generator', 'generators', 'Generators', 'KES 78,000',
   'A reliable 5000W petrol generator with automatic voltage regulation and low-noise operation, perfect for home backup power.',
   '["5000W rated output", "AVR technology", "Low noise 68dB", "Electric start", "12-hour runtime", "Fuel gauge"]',
   'New', true, 2, 4),
  ('IndustryPro 10KVA Generator', 'generators', 'Generators', 'KES 245,000',
   'Heavy-duty 10KVA diesel generator for commercial and industrial applications. Features soundproof canopy and automatic transfer switch.',
   '["10KVA output", "Diesel engine", "Soundproof canopy", "Auto transfer switch", "Digital panel", "Wheel kit included"]',
   NULL, false, NULL, 5),
  ('MixMaster Concrete Mixer', 'construction-equipment', 'Construction Equipment', 'KES 165,000',
   'A heavy-duty concrete mixer with 400L drum capacity, powered by a reliable diesel engine. Perfect for medium to large construction projects.',
   '["400L drum capacity", "Diesel powered", "Tilting drum design", "Heavy-duty frame", "Portable on wheels", "Cast iron ring gear"]',
   NULL, false, NULL, 6),
  ('VibraCompact Plate Compactor', 'construction-equipment', 'Construction Equipment', 'KES 89,000',
   'A powerful plate compactor for soil and gravel compaction. Features vibration-dampened handle and forward/reverse travel.',
   '["5.5HP engine", "Forward & reverse", "Anti-vibration handle", "Compaction force 15kN", "Water tank option", "Transport wheels"]',
   'Popular', true, 3, 7),
  ('FarmKing 45HP Tractor', 'tractors', 'Tractors & Implements', 'KES 2,850,000',
   'A versatile 45HP agricultural tractor with 4WD capability, power steering, and 3-point hitch for various farming implements.',
   '["45HP diesel engine", "4WD system", "Power steering", "8+2 transmission", "3-point hitch", "540 RPM PTO"]',
   NULL, false, NULL, 8),
  ('AquaFlow 3" Water Pump', 'water-pumps', 'Water Pumps', 'KES 42,000',
   'A high-capacity 3-inch water pump ideal for irrigation, construction dewatering, and water transfer applications.',
   '["3\" inlet/outlet", "6.5HP engine", "1000L/min flow", "28m max head", "Self-priming", "Recoil start"]',
   NULL, false, NULL, 9),
  ('CargoMax Three Wheeler', 'three-wheelers', 'Three Wheelers', 'KES 420,000',
   'A durable cargo three-wheeler designed for commercial transport and delivery in urban and semi-urban areas. Features a spacious cargo bed.',
   '["200cc engine", "800kg payload", "Hydraulic brakes", "Full cabin", "Cargo bed 1.8m", "LED lights"]',
   'New', true, 4, 10),
  ('AirPro 50L Compressor', 'air-compressors', 'Air Compressors', 'KES 35,000',
   'A reliable 50-litre belt-driven air compressor perfect for automotive workshops, spray painting, and pneumatic tools.',
   '["50L tank", "2.5HP motor", "8 bar pressure", "Belt driven", "Oil lubricated", "Quick coupler"]',
   NULL, false, NULL, 11),
  ('AllTerrain SUV Tyre 265/70R16', 'tyres', 'Tyres', 'KES 18,500',
   'A premium all-terrain tyre designed for SUVs and pickup trucks. Provides excellent grip on both paved roads and off-road conditions.',
   '["265/70R16 size", "All-terrain pattern", "Reinforced sidewall", "Mud & snow rated", "80,000km warranty", "Tubeless design"]',
   NULL, false, NULL, 12),
  ('ProLube Synthetic 5W-30', 'automobile-oil', 'Automobile Oil', 'KES 4,500',
   'A fully synthetic engine oil formulated for modern petrol and diesel engines. Provides superior protection and fuel economy.',
   '["5W-30 grade", "Fully synthetic", "API SN Plus", "4L pack", "Extended drain", "Low SAPS"]',
   NULL, false, NULL, 13),
  ('GreenCut Lawn Mower 18"', 'lawn-yard', 'Lawn & Yard', 'KES 52,000',
   'An 18-inch self-propelled petrol lawn mower with mulching capability and adjustable cutting height for pristine lawn maintenance.',
   '["18\" cutting deck", "5.5HP engine", "Self-propelled", "7 height settings", "Mulch & collect", "Foldable handle"]',
   NULL, false, NULL, 14),
  ('TrackPro GPS Sports Watch', 'fitness-gps', 'Fitness Watches & GPS Devices', 'KES 12,800',
   'An advanced GPS sports watch with heart rate monitoring, multi-sport tracking, and a durable waterproof design for outdoor enthusiasts.',
   '["GPS tracking", "Heart rate monitor", "50m waterproof", "14-day battery", "Multi-sport modes", "Bluetooth sync"]',
   'New', true, 5, 15),
  ('PowerDrive 5HP Electric Motor', 'industrial-motors', 'Industrial Motors', 'KES 28,000',
   'A high-efficiency 5HP three-phase electric motor suitable for pumps, compressors, conveyor systems, and various industrial machinery.',
   '["5HP / 3.7kW", "Three phase", "IE3 efficiency", "IP55 protection", "B3 foot mount", "Cast iron frame"]',
   NULL, false, NULL, 16),
  ('MarineForce 40HP Outboard', 'engines', 'Outboard & Inboard Engines', 'KES 485,000',
   'A powerful 40HP 4-stroke outboard engine with electronic fuel injection for smooth, fuel-efficient marine propulsion.',
   '["40HP output", "4-stroke EFI", "Electric start", "Power trim & tilt", "Stainless prop", "Freshwater flush"]',
   NULL, false, NULL, 17),
  ('LiftPro 2.5T Forklift', 'material-handling', 'Material Handling Equipment', 'KES 1,950,000',
   'A robust 2.5-tonne diesel forklift with excellent visibility, ergonomic controls, and a powerful engine for demanding warehouse operations.',
   '["2.5T capacity", "Diesel engine", "3m mast height", "Side shift", "Solid tyres", "Full cabin"]',
   NULL, false, NULL, 18),
  ('WashPro 15kg Commercial Washer', 'commercial-laundry', 'Commercial Laundry Equipment', 'KES 320,000',
   'A high-capacity 15kg commercial washing machine designed for laundromats, hotels, and hospitals with programmable wash cycles.',
   '["15kg capacity", "Programmable cycles", "Spin extraction", "Stainless drum", "Water recycling", "Energy efficient"]',
   NULL, false, NULL, 19)
ON CONFLICT DO NOTHING;

-- ============================================
-- HELPER VIEWS (Optional - for easier querying)
-- ============================================

-- View for featured products with category info
CREATE OR REPLACE VIEW featured_products_view AS
SELECT
  p.id,
  p.name,
  p.description,
  p.price,
  p.features,
  p.image_url,
  p.is_featured,
  p.featured_order,
  p.display_order,
  p.category_id,
  p.category_slug,
  c.name as category_name,
  c.icon as category_icon
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.is_featured = true
ORDER BY p.featured_order ASC NULLS LAST;

-- View for products with category info
CREATE OR REPLACE VIEW products_with_category_view AS
SELECT
  p.id,
  p.name,
  p.description,
  p.price,
  p.features,
  p.image_url,
  p.is_featured,
  p.featured_order,
  p.display_order,
  p.category_id,
  p.category_slug,
  c.name as category_name,
  c.icon as category_icon
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.display_order ASC, p.name ASC;

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- 
-- Next steps:
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Install @supabase/supabase-js in your project
-- 3. Create .env file with your Supabase credentials
-- 4. Update your components to fetch from Supabase
-- 5. Build the admin dashboard
--
