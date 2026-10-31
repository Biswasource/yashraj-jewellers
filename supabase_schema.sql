-- ============================================================================
-- YASHRAJ JEWELLERS - SUPABASE DATABASE SCHEMA
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ============================================================================

-- 1. Create the products table
create table if not exists public.products (
  id text primary key,
  name text not null,
  code text not null unique,
  category text not null,
  metal text not null,
  purity text not null,
  price numeric not null,
  original_price numeric not null,
  gross_weight numeric not null,
  net_gold_weight numeric not null,
  making_charges numeric not null default 0,
  gst numeric not null default 0,
  stone_weight text,
  tag text,
  gender text not null default 'women',
  occasion text not null default 'wedding',
  rating numeric default 5.0,
  reviews_count integer default 1,
  in_stock boolean default true,
  images text[] not null default '{}',
  description text,
  certification text default 'Certified Authentic',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create index on frequently filtered fields
create index if not exists idx_products_category on public.products (category);
create index if not exists idx_products_metal on public.products (metal);
create index if not exists idx_products_in_stock on public.products (in_stock);
create index if not exists idx_products_created_at on public.products (created_at desc);

-- 3. Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- 4. Policies:
-- Allow anyone (public & storefront visitors) to view all products
create policy "Public can view products"
  on public.products
  for select
  using (true);

-- Allow insert access for admin
create policy "Allow insert access"
  on public.products
  for insert
  with check (true);

-- Allow update access for admin
create policy "Allow update access"
  on public.products
  for update
  using (true)
  with check (true);

-- Allow delete access for admin
create policy "Allow delete access"
  on public.products
  for delete
  using (true);
