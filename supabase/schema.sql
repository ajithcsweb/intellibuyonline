-- IntelliBuy Online - Supabase PostgreSQL Schema
-- Copy and paste this script into your Supabase Dashboard -> SQL Editor and click RUN

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    main_image TEXT NOT NULL,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    best_price NUMERIC NOT NULL,
    original_price NUMERIC NOT NULL,
    discount_percentage NUMERIC DEFAULT 0,
    rating NUMERIC DEFAULT 4.5,
    review_count INT DEFAULT 1,
    badge TEXT,
    specs JSONB DEFAULT '{}'::jsonb,
    pros JSONB DEFAULT '[]'::jsonb,
    cons JSONB DEFAULT '[]'::jsonb,
    is_today_deal BOOLEAN DEFAULT false,
    created_date DATE DEFAULT CURRENT_DATE
);

-- 2. Create Store Prices Table
CREATE TABLE IF NOT EXISTS public.store_prices (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
    store_name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    discount NUMERIC DEFAULT 0,
    coupon_code TEXT,
    shipping TEXT DEFAULT 'Free Delivery',
    badge TEXT,
    affiliate_url TEXT NOT NULL
);

-- 3. Create Price History Table
CREATE TABLE IF NOT EXISTS public.price_history (
    id SERIAL PRIMARY KEY,
    product_id TEXT REFERENCES public.products(id) ON DELETE CASCADE,
    record_date TEXT NOT NULL,
    amazon_price NUMERIC,
    flipkart_price NUMERIC,
    croma_price NUMERIC
);

-- 4. Create Deals Table
CREATE TABLE IF NOT EXISTS public.deals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    store TEXT NOT NULL,
    original_price NUMERIC NOT NULL,
    deal_price NUMERIC NOT NULL,
    discount TEXT NOT NULL,
    description TEXT,
    image TEXT NOT NULL,
    link TEXT NOT NULL
);

-- 5. Create Coupons Table
CREATE TABLE IF NOT EXISTS public.coupons (
    id TEXT PRIMARY KEY,
    store TEXT NOT NULL,
    code TEXT NOT NULL,
    discount_text TEXT NOT NULL,
    description TEXT,
    min_spend TEXT,
    expires_at TEXT NOT NULL
);

-- 6. Create Affiliate Click Logs Table
CREATE TABLE IF NOT EXISTS public.affiliate_logs (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    product_title TEXT NOT NULL,
    store TEXT NOT NULL,
    click_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    commission_earned NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'Clicked',
    user_region TEXT DEFAULT 'Live Visitor'
);

-- 7. Create User Profiles Table linked to Supabase Auth
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automatic trigger to create profile record when a new user registers in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution binding
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (select/insert)
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to store_prices" ON public.store_prices FOR SELECT USING (true);
CREATE POLICY "Allow public read access to price_history" ON public.price_history FOR SELECT USING (true);
CREATE POLICY "Allow public read access to deals" ON public.deals FOR SELECT USING (true);
CREATE POLICY "Allow public read access to coupons" ON public.coupons FOR SELECT USING (true);

CREATE POLICY "Allow public insert to products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to affiliate_logs" ON public.affiliate_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access to affiliate_logs" ON public.affiliate_logs FOR SELECT USING (true);
CREATE POLICY "Allow users to view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow users to update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
