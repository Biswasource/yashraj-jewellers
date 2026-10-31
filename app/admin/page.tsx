"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../context/StoreContext";
import {
  Product,
  CATEGORIES,
  METALS,
  OCCASIONS,
  LIVE_RATES,
} from "../data/products";
import {
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Store,
  LogOut,
  TrendingUp,
  Package,
  Gem,
  Award,
  Sparkles,
  Check,
  X,
  UploadCloud,
  CheckCircle2,
  RefreshCw,
  Scale,
  IndianRupee,
  Layers,
  Tag,
  AlertTriangle,
  Database,
  Key,
  Copy,
  Radio,
  Cloud,
  ImageIcon,
  Link2,
} from "lucide-react";
import {
  isSupabaseConfigured,
  getSupabaseCredentials,
  saveSupabaseCredentials,
  testSupabaseConnection,
} from "../lib/supabase";
import {
  uploadImageToCloudinary,
  getCloudinaryConfig,
  saveCloudinaryConfig,
  isCloudinaryConfigured,
} from "../lib/cloudinary";

// Default fallback image if no Cloudinary photo is uploaded
const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80";

const SUPABASE_SCHEMA_SQL = `-- Run this in your Supabase SQL Editor:
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

alter table public.products enable row level security;
create policy "Public can view products" on public.products for select using (true);
create policy "Allow insert access" on public.products for insert with check (true);
create policy "Allow update access" on public.products for update using (true) with check (true);
create policy "Allow delete access" on public.products for delete using (true);`;

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    refreshProducts,
    isSupabaseReady,
    isLoadingProducts,
    isAdminAuthenticated,
    adminLogout,
    showToast,
  } = useStore();

  // Supabase Configuration Modal State
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [supabaseUrlInput, setSupabaseUrlInput] = useState("");
  const [supabaseKeyInput, setSupabaseKeyInput] = useState("");
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [isCopiedSql, setIsCopiedSql] = useState(false);
  const [activeSupabaseTab, setActiveSupabaseTab] = useState<"credentials" | "sql">("credentials");

  useEffect(() => {
    const creds = getSupabaseCredentials();
    setSupabaseUrlInput(creds.url);
    setSupabaseKeyInput(creds.anonKey);
  }, [isSupabaseModalOpen]);

  // Cloudinary Media Storage State
  const [isCloudinaryModalOpen, setIsCloudinaryModalOpen] = useState(false);
  const [cloudinaryCloudNameInput, setCloudinaryCloudNameInput] = useState("");
  const [cloudinaryPresetInput, setCloudinaryPresetInput] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("");
  const [copiedImageUrl, setCopiedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const config = getCloudinaryConfig();
    setCloudinaryCloudNameInput(config.cloudName);
    setCloudinaryPresetInput(config.uploadPreset);
  }, [isCloudinaryModalOpen]);

  const handleSaveCloudinarySettings = () => {
    saveCloudinaryConfig(cloudinaryCloudNameInput, cloudinaryPresetInput);
    setIsCloudinaryModalOpen(false);
    showToast("Cloudinary configuration saved! Images will upload to this Cloudinary cloud.");
  };

  const handleUploadFileToCloudinary = async (file: File) => {
    const config = getCloudinaryConfig();
    if (!config.cloudName || !config.uploadPreset) {
      setIsCloudinaryModalOpen(true);
      showToast("Please enter your Cloudinary Cloud Name & Upload Preset first.");
      return;
    }

    try {
      setIsUploadingImage(true);
      setUploadProgressText(`Uploading ${file.name} to Cloudinary...`);
      const res = await uploadImageToCloudinary(file);
      if (res.success && res.url) {
        setFormData((prev) => ({
          ...prev,
          images: [res.url!, ...prev.images],
        }));
        setImageInputUrl(res.url);
        showToast("Image uploaded to Cloudinary! URL string stored successfully.");
      } else {
        showToast(res.error || "Failed to upload image to Cloudinary.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload error";
      showToast(msg);
    } finally {
      setIsUploadingImage(false);
      setUploadProgressText("");
    }
  };

  // Authentication Guard
  useEffect(() => {
    if (!isAdminAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAdminAuthenticated, router]);

  // Inventory Table Filters & Search
  const [tableSearch, setTableSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [metalFilter, setMetalFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock">("all");

  // Modal State for Add / Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const initialFormState: Omit<Product, "id"> & { id?: string } = {
    id: "",
    name: "",
    code: "",
    category: "necklaces",
    metal: "gold",
    purity: "22KT (916 BIS)",
    gender: "women",
    occasion: "wedding",
    price: 95000,
    originalPrice: 105000,
    grossWeight: 14.5,
    netGoldWeight: 14.0,
    stoneWeight: "",
    makingCharges: 8500,
    gst: 2850,
    tag: "New Arrival",
    rating: 5.0,
    reviewsCount: 1,
    inStock: true,
    description: "",
    images: [],
    certification: "Certified Authentic",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageInputUrl, setImageInputUrl] = useState("");

  // Statistics
  const stats = useMemo(() => {
    const total = products.length;
    const goldCount = products.filter((p) => p.metal === "gold").length;
    const diamondCount = products.filter((p) => p.metal === "diamond").length;
    const silverCount = products.filter((p) => p.metal === "silver").length;
    const totalValue = products.reduce((acc, p) => acc + p.price, 0);
    const inStockCount = products.filter((p) => p.inStock).length;

    return {
      total,
      goldCount,
      diamondCount,
      silverCount,
      totalValue,
      inStockCount,
    };
  }, [products]);

  // Filtered Inventory
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (tableSearch.trim()) {
        const q = tableSearch.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchMetal = item.metal.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchCat && !matchMetal) return false;
      }
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (metalFilter !== "all" && item.metal !== metalFilter) return false;
      if (stockFilter === "in-stock" && !item.inStock) return false;
      if (stockFilter === "out-of-stock" && item.inStock) return false;
      return true;
    });
  }, [products, tableSearch, categoryFilter, metalFilter, stockFilter]);

  // Handlers
  const handleOpenAddModal = () => {
    const newCode = `YJ-${formData.metal.toUpperCase().slice(0, 3)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setFormData({
      ...initialFormState,
      id: `yj-${Date.now()}`,
      code: newCode,
      images: [],
    });
    setEditingProductId(null);
    setImageInputUrl("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setFormData({ ...product });
    setEditingProductId(product.id);
    setImageInputUrl("");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.code.trim()) {
      alert("Please provide at least a Product Name and SKU Code.");
      return;
    }

    const finalProduct: Product = {
      ...formData,
      id: editingProductId || formData.id || `yj-${Date.now()}`,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      grossWeight: Number(formData.grossWeight),
      netGoldWeight: Number(formData.netGoldWeight),
      makingCharges: Number(formData.makingCharges),
      gst: Number(formData.gst) || Math.round(Number(formData.price) * 0.03),
      images: formData.images.length > 0 ? formData.images : [DEFAULT_FALLBACK_IMAGE],
      certification: formData.certification || "Certified Authentic",
      description:
        formData.description ||
        `${formData.name} - Handcrafted ${formData.purity} ${formData.metal} jewellery from Yashraj Jewellers.`,
    };

    if (editingProductId) {
      await updateProduct(editingProductId, finalProduct);
    } else {
      await addProduct(finalProduct);
    }

    setIsModalOpen(false);
  };

  const handleAddImageUrl = () => {
    if (imageInputUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInputUrl.trim()],
      }));
      setImageInputUrl("");
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleAutoGenerateSku = () => {
    const prefix = formData.category.slice(0, 3).toUpperCase();
    const metalCode = formData.metal === "gold" ? "GLD" : formData.metal === "diamond" ? "DIA" : "SLV";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setFormData((prev) => ({
      ...prev,
      code: `YJ-${metalCode}-${randomNum}`,
    }));
  };

  const handleToggleStock = (product: Product) => {
    updateProduct(product.id, { inStock: !product.inStock });
  };

  const handleExecuteDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  if (!isAdminAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A130B] flex flex-col selection:bg-[#DFBA73]/30 font-sans">
      {/* 1. TOP ADMIN PORTAL NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#072016] text-[#F5E8CB] border-b-2 border-[#DFBA73]/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#DFBA73] bg-[#0A2E20] shadow-md">
              <img src="/logo.png" alt="Yashraj Jewellers" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-white uppercase tracking-wider">
                  Yashraj Admin
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DFBA73] text-stone-950 uppercase tracking-widest">
                  HQ Master Portal
                </span>
              </div>
              <p className="text-[10px] font-sans text-emerald-300/80 tracking-widest uppercase">
                Inventory &amp; Product Control Center
              </p>
            </div>
          </div>

          {/* Right Header: Bullion Context, Storefront link, Admin User & Logout */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Live Gold Ticker Pill */}
            <div className="hidden lg:flex items-center space-x-2 bg-black/40 px-3 py-1.5 rounded-xl border border-[#DFBA73]/30 text-xs">
              <TrendingUp className="w-3.5 h-3.5 text-[#DFBA73]" />
              <span className="text-[11px] font-mono text-emerald-100">
                22K: ₹{LIVE_RATES.gold22k}/g • 24K: ₹{LIVE_RATES.gold24k}/g
              </span>
            </div>

            {/* Sync Database */}
            <button
              onClick={refreshProducts}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#DFBA73] hover:text-white text-xs font-semibold flex items-center space-x-1 border border-[#DFBA73]/30 transition cursor-pointer"
              title="Sync latest products from Supabase"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sync</span>
            </button>

            {/* Visit Storefront */}
            <Link
              href="/products"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#DFBA73] hover:text-white text-xs font-semibold flex items-center space-x-1.5 border border-[#DFBA73]/30 transition shadow-xs"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </Link>

            {/* Logout Button */}
            <button
              onClick={adminLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs font-semibold flex items-center space-x-1.5 border border-rose-700/50 transition cursor-pointer"
              title="End Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. ADMIN DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* WELCOME BANNER & STATS */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Jewellery Inventory Management
                </h1>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isSupabaseReady
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {isSupabaseReady ? "Supabase Live Database" : "Local & Cloud Ready"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Real-time inventory database. All creations added here are immediately saved into your database and visible on your storefront.
              </p>
            </div>

            <div className="flex items-center space-x-2.5">
              {/* Primary Action Button */}
              <button
                onClick={handleOpenAddModal}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:brightness-105 active:scale-98 transition flex items-center justify-center space-x-2 cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Jewellery Product</span>
              </button>
            </div>
          </div>

          {/* Stats Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                Total Products
              </span>
              <p className="font-serif font-bold text-2xl text-stone-900 mt-1">{stats.total}</p>
              <span className="text-[11px] text-emerald-700 font-medium">Active in Catalog</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 block">
                22K/24K Gold
              </span>
              <p className="font-serif font-bold text-2xl text-stone-900 mt-1">{stats.goldCount}</p>
              <span className="text-[11px] text-stone-500">Hallmarked Items</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 block">
                Certified Diamond
              </span>
              <p className="font-serif font-bold text-2xl text-stone-900 mt-1">
                {stats.diamondCount}
              </p>
              <span className="text-[11px] text-stone-500">Solitaires &amp; Rings</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
                Silver &amp; Tarakasi
              </span>
              <p className="font-serif font-bold text-2xl text-stone-900 mt-1">{stats.silverCount}</p>
              <span className="text-[11px] text-stone-500">GI Tagged Filigree</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 block">
                In Stock Ready
              </span>
              <p className="font-serif font-bold text-2xl text-stone-900 mt-1">{stats.inStockCount}</p>
              <span className="text-[11px] text-emerald-700 font-medium">Ready for Dispatch</span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF3E0] to-[#F5E8CB] border border-[#DEC9A2] shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F6D2C] block">
                Inventory Valuation
              </span>
              <p className="font-serif font-bold text-xl sm:text-2xl text-stone-950 mt-1 font-mono">
                ₹{(stats.totalValue / 100000).toFixed(2)}L
              </p>
              <span className="text-[10px] text-[#7A5B1F] font-semibold">Live Quoted Value</span>
            </div>
          </div>
        </section>

        {/* 3. INVENTORY MANAGEMENT CONTROLS & TABLE */}
        <section className="bg-white rounded-3xl border border-[#E8DFC8] shadow-xs overflow-hidden">
          {/* Controls Bar: Search & Filter Dropdowns */}
          <div className="p-4 sm:p-5 border-b border-[#F0EAE1] bg-[#FAF9F5] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8F6D2C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search products by title, SKU (e.g. YJ-BRD-8821), or metal..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#DEC9A2] text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-[#C5A059]"
              />
              {tableSearch && (
                <button
                  onClick={() => setTableSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-white rounded-xl border border-[#DEC9A2] text-stone-800 text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.slice(1).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>

              {/* Metal Filter */}
              <select
                value={metalFilter}
                onChange={(e) => setMetalFilter(e.target.value)}
                className="px-3 py-2 bg-white rounded-xl border border-[#DEC9A2] text-stone-800 text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Metals</option>
                <option value="gold">Gold (22K / 24K)</option>
                <option value="diamond">Certified Diamond</option>
                <option value="silver">Silver &amp; Filigree</option>
              </select>

              {/* Stock Filter */}
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as any)}
                className="px-3 py-2 bg-white rounded-xl border border-[#DEC9A2] text-stone-800 text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="all">All Stock Status</option>
                <option value="in-stock">In Stock Only</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>

              {/* Reset to Default Button */}
              <button
                onClick={() => {
                  if (confirm("Reset inventory to original factory showroom items? Any custom products will be restored to default.")) {
                    resetProductsToDefault();
                  }
                }}
                className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-600 transition flex items-center space-x-1"
                title="Restore default catalog"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-700 border-collapse">
              <thead>
                <tr className="bg-[#FAF3E0] text-[#7A5B1F] border-b border-[#DEC9A2] text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4">Item &amp; SKU</th>
                  <th className="py-3.5 px-3">Category</th>
                  <th className="py-3.5 px-3">Metal &amp; Purity</th>
                  <th className="py-3.5 px-3">Gross Wt / Net Wt</th>
                  <th className="py-3.5 px-3">Selling Price</th>
                  <th className="py-3.5 px-3">Stock Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE1]">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF9F5] transition-colors">
                      {/* Product Thumbnail & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-stone-100 border border-[#DEC9A2] overflow-hidden shrink-0 relative">
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-serif font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                              {prod.name}
                            </p>
                            <div className="flex items-center space-x-1.5 mt-0.5">
                              <span className="font-mono text-[10px] text-stone-500 font-bold">
                                {prod.code}
                              </span>
                              {prod.tag && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#FAF3E0] text-[#8F6D2C] border border-[#DEC9A2]">
                                  {prod.tag}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3 capitalize font-medium text-stone-800">
                        {prod.category}
                      </td>

                      {/* Metal & Purity */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            prod.metal === "gold"
                              ? "bg-amber-100 text-amber-800"
                              : prod.metal === "diamond"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {prod.purity}
                        </span>
                      </td>

                      {/* Weights */}
                      <td className="py-3 px-3 font-mono">
                        <div>
                          <strong>{prod.grossWeight}g</strong> gross
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {prod.netGoldWeight}g net
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3 font-mono">
                        <p className="font-bold text-stone-900 text-sm">
                          ₹{prod.price.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[10px] text-stone-400 line-through">
                          ₹{prod.originalPrice.toLocaleString("en-IN")}
                        </p>
                      </td>

                      {/* Stock Switch */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleToggleStock(prod)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition flex items-center space-x-1 ${
                            prod.inStock
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              prod.inStock ? "bg-emerald-600" : "bg-rose-600"
                            }`}
                          />
                          <span>{prod.inStock ? "In Stock" : "Out of Stock"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* View on Storefront */}
                          <Link
                            href={`/products/${prod.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition"
                            title="Preview on Storefront"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          {/* Edit */}
                          <button
                            onClick={() => handleOpenEditModal(prod)}
                            className="p-1.5 rounded-lg hover:bg-[#FAF3E0] text-[#8F6D2C] hover:text-[#7A5B1F] transition cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteConfirmId(prod.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 hover:text-rose-800 transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-stone-400">
                      {products.length === 0 ? (
                        <div className="max-w-md mx-auto space-y-3">
                          <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF3E0] border border-[#DEC9A2] flex items-center justify-center text-[#8F6D2C]">
                            <Package className="w-7 h-7" />
                          </div>
                          <h3 className="font-serif font-bold text-lg text-stone-900">
                            Inventory Clean &amp; Ready for Real Products
                          </h3>
                          <p className="text-xs text-stone-500">
                            All mock and demo data have been removed. Click below to add your first real jewellery masterpiece or sync with Supabase.
                          </p>
                          <div className="pt-2 flex justify-center gap-2">
                            <button
                              onClick={handleOpenAddModal}
                              className="px-4 py-2 bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition"
                            >
                              + Add First Product
                            </button>
                            <button
                              onClick={() => setIsSupabaseModalOpen(true)}
                              className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-bold text-xs uppercase tracking-wider rounded-xl transition"
                            >
                              Connect Supabase
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="font-serif text-base text-stone-600">No items match your filter criteria.</p>
                          <button
                            onClick={() => {
                              setTableSearch("");
                              setCategoryFilter("all");
                              setMetalFilter("all");
                              setStockFilter("all");
                            }}
                            className="mt-2 text-xs font-bold text-[#8F6D2C] underline"
                          >
                            Reset Table Filters
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="p-4 bg-[#FAF9F5] border-t border-[#F0EAE1] flex items-center justify-between text-xs text-stone-500">
            <span>
              Showing <strong>{filteredProducts.length}</strong> of {products.length} registered creations
            </span>
            <span className="font-mono text-[#8F6D2C] font-semibold">
              Live Bullion Assay Standard: BIS 916
            </span>
          </div>
        </section>
      </main>

      {/* 4. ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-[#E8DFC8] flex items-center justify-between bg-[#FAF9F5]">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-[#FAF3E0] text-[#8F6D2C] rounded-xl border border-[#DEC9A2]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    {editingProductId ? "Edit Jewellery Creation" : "Add New Jewellery Piece"}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Publish directly to the Yashraj Jewellers catalogue and storefront.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scroll Area */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* SECTION 1: BASIC IDENTIFICATION */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider text-[11px] border-b border-[#F0EAE1] pb-1">
                  1. Product Identification
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="font-semibold text-stone-700">Jewellery Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajwada Royal 22K Gold Antique Choker Set"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 focus:outline-hidden focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="font-semibold text-stone-700">SKU / Code *</label>
                      <button
                        type="button"
                        onClick={handleAutoGenerateSku}
                        className="text-[10px] text-[#8F6D2C] hover:underline font-bold"
                      >
                        Auto SKU
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="YJ-BRD-8821"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono font-bold focus:outline-hidden focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 focus:outline-hidden"
                    >
                      {CATEGORIES.slice(1).map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Metal */}
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Metal Type</label>
                    <select
                      value={formData.metal}
                      onChange={(e) => setFormData({ ...formData, metal: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 focus:outline-hidden"
                    >
                      <option value="gold">Gold</option>
                      <option value="diamond">Certified Diamond</option>
                      <option value="silver">Silver &amp; Filigree</option>
                    </select>
                  </div>

                  {/* Purity */}
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Purity Standard</label>
                    <select
                      value={formData.purity}
                      onChange={(e) => setFormData({ ...formData, purity: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 focus:outline-hidden"
                    >
                      <option value="22KT (916 BIS)">22KT (916 BIS)</option>
                      <option value="24KT (999 Pure)">24KT (999 Pure)</option>
                      <option value="18KT Gold & Diamond">18KT Gold &amp; Diamond</option>
                      <option value="925 Sterling Silver">925 Sterling Silver</option>
                    </select>
                  </div>

                  {/* Tag Badge */}
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Special Tag</label>
                    <select
                      value={formData.tag || ""}
                      onChange={(e) => setFormData({ ...formData, tag: (e.target.value || undefined) as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 focus:outline-hidden"
                    >
                      <option value="">None</option>
                      <option value="Bestseller">Bestseller</option>
                      <option value="Heritage Bridal">Heritage Bridal</option>
                      <option value="New Arrival">New Arrival</option>
                      <option value="Trending">Trending</option>
                      <option value="24K Pure Bullion">24K Pure Bullion</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Gender / Fit</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 focus:outline-hidden"
                    >
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="kids">Kids</option>
                      <option value="unisex">Unisex / Bullion</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Occasion</label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 focus:outline-hidden"
                    >
                      <option value="wedding">Vivaha Bridal</option>
                      <option value="festive">Festive &amp; Puja</option>
                      <option value="daily-wear">Everyday Elegance</option>
                      <option value="light-occasion">Light Occasions</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: WEIGHTS & PRICING */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider text-[11px] border-b border-[#F0EAE1] pb-1">
                  2. Weights &amp; Transparent Billing Specs
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Gross Weight (g) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.grossWeight}
                      onChange={(e) => setFormData({ ...formData, grossWeight: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Net Gold Wt (g) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.netGoldWeight}
                      onChange={(e) => setFormData({ ...formData, netGoldWeight: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Making Charges (₹)</label>
                    <input
                      type="number"
                      value={formData.makingCharges}
                      onChange={(e) => setFormData({ ...formData, makingCharges: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono font-bold focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-700">Original Retail (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: CLOUDINARY PRODUCT IMAGE UPLOAD & STRING URL STORAGE */}
              <div className="space-y-4">
                <div className="border-b border-[#F0EAE1] pb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-4 h-4 text-sky-600" />
                    <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider text-xs">
                      3. Cloudinary Product Images (Stored as String URLs)
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsCloudinaryModalOpen(true)}
                      className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 underline flex items-center space-x-1"
                    >
                      <span>Cloudinary Settings</span>
                    </button>
                    <span className="text-[10px] text-stone-400 font-normal">
                      {formData.images.length} photo(s)
                    </span>
                  </div>
                </div>

                {/* Direct Cloudinary Upload Area */}
                <div className="rounded-2xl border-2 border-dashed border-[#C5A059]/40 bg-[#FAF7F0] p-4 text-center hover:border-[#8F6D2C] transition relative group">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploadingImage}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadFileToCloudinary(file);
                        e.target.value = "";
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-[#DEC9A2] flex items-center justify-center text-[#8F6D2C] group-hover:scale-105 transition-transform">
                      {isUploadingImage ? (
                        <div className="w-5 h-5 border-2 border-[#8F6D2C] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <UploadCloud className="w-6 h-6 text-[#8F6D2C]" />
                      )}
                    </div>
                    {isUploadingImage ? (
                      <div>
                        <p className="font-bold text-xs text-sky-900">{uploadProgressText || "Uploading to Cloudinary..."}</p>
                        <p className="text-[11px] text-stone-500">Generating permanent CDN secure string URL...</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-bold text-xs text-stone-800">
                          Click or Drag Jewellery Image to Upload to Cloudinary
                        </p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Uploads directly to Cloudinary and returns a permanent HTTPS string URL
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Or Paste Existing Cloudinary String URL */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-700 flex items-center justify-between text-xs">
                    <span>Or Paste Cloudinary / Image URL String</span>
                    <span className="text-[10px] font-normal text-stone-400">
                      Direct https:// URL string
                    </span>
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Link2 className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="url"
                        value={imageInputUrl}
                        onChange={(e) => setImageInputUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddImageUrl();
                          }
                        }}
                        placeholder="https://res.cloudinary.com/.../image/upload/..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 focus:outline-hidden text-xs font-mono"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2 bg-[#FAF3E0] hover:bg-[#8F6D2C] text-[#8F6D2C] hover:text-white border border-[#DEC9A2] rounded-xl font-bold uppercase tracking-wider text-xs transition shrink-0 cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {/* Stored Cloudinary String URLs List */}
                {formData.images.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block">
                      Uploaded Images ({formData.images.length})
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {formData.images.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-xl bg-[#FAF9F5] border border-stone-200 gap-3"
                        >
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className="w-12 h-12 rounded-lg bg-stone-100 border border-stone-300 overflow-hidden shrink-0">
                              <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                                  {imgUrl.includes("cloudinary.com") ? "Cloudinary CDN" : "Image URL"}
                                </span>
                                {idx === 0 && (
                                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                                    Primary Cover
                                  </span>
                                )}
                              </div>
                              <p className="font-mono text-[10px] text-stone-600 truncate mt-0.5" title={imgUrl}>
                                {imgUrl}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(imgUrl);
                                setCopiedImageUrl(imgUrl);
                                setTimeout(() => setCopiedImageUrl(null), 2000);
                              }}
                              className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-200 text-stone-700 transition"
                              title="Copy URL string"
                            >
                              {copiedImageUrl === imgUrl ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-100 text-rose-600 transition"
                              title="Delete photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product In Stock Checkbox */}
                <div className="pt-2 border-t border-[#F0EAE1]">
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="accent-[#C5A059] w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="font-bold text-stone-800 text-xs">
                      Product In Stock (Immediate Showroom Dispatch)
                    </span>
                  </label>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="pt-4 border-t border-[#E8DFC8] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-stone-950 font-bold uppercase tracking-wider text-xs shadow hover:brightness-105 transition"
                >
                  {editingProductId ? "Update Jewellery Specs" : "Save & Publish to Store"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. SUPABASE SETTINGS & SQL MODAL */}
      {isSupabaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-[#E8DFC8] flex items-center justify-between bg-[#FAF9F5]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#FAF3E0] text-[#8F6D2C] rounded-xl border border-[#DEC9A2]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Supabase Database Configuration
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Store and synchronize all live jewellery pieces with your Supabase PostgreSQL database.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSupabaseModalOpen(false)}
                className="p-2 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-[#E8DFC8] bg-stone-50/50 px-6">
              <button
                onClick={() => setActiveSupabaseTab("credentials")}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                  activeSupabaseTab === "credentials"
                    ? "border-[#8F6D2C] text-[#8F6D2C]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                1. Project Credentials
              </button>
              <button
                onClick={() => setActiveSupabaseTab("sql")}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                  activeSupabaseTab === "sql"
                    ? "border-[#8F6D2C] text-[#8F6D2C]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                2. SQL Schema Setup (1-Click Copy)
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {activeSupabaseTab === "credentials" ? (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <p className="font-bold flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Zero Setup Hassle</span>
                    </p>
                    <p className="text-[11px] text-emerald-800">
                      Enter your Project URL and Anon Key below (found in your Supabase dashboard under <strong>Settings &gt; API</strong>). They will be saved to your environment and securely connected.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-stone-700 text-xs">
                      Supabase Project URL
                    </label>
                    <input
                      type="url"
                      value={supabaseUrlInput}
                      onChange={(e) => setSupabaseUrlInput(e.target.value)}
                      placeholder="https://your-project-id.supabase.co"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono text-xs focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-stone-700 text-xs">
                      Supabase Anon / Public API Key
                    </label>
                    <input
                      type="password"
                      value={supabaseKeyInput}
                      onChange={(e) => setSupabaseKeyInput(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono text-xs focus:outline-hidden"
                    />
                  </div>

                  {testResult && (
                    <div
                      className={`p-3 rounded-xl border text-xs font-medium animate-fade-in ${
                        testResult.success
                          ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                          : "bg-rose-50 border-rose-300 text-rose-800"
                      }`}
                    >
                      {testResult.message}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      disabled={isTesting || !supabaseUrlInput.trim() || !supabaseKeyInput.trim()}
                      onClick={async () => {
                        setIsTesting(true);
                        setTestResult(null);
                        saveSupabaseCredentials(supabaseUrlInput, supabaseKeyInput);
                        const result = await testSupabaseConnection();
                        setTestResult(result);
                        setIsTesting(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition"
                    >
                      {isTesting ? "Testing Connection..." : "Test Connection"}
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        saveSupabaseCredentials(supabaseUrlInput, supabaseKeyInput);
                        await refreshProducts();
                        setIsSupabaseModalOpen(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-950 font-bold text-xs uppercase tracking-wider shadow hover:brightness-105 transition"
                    >
                      Save &amp; Sync Database
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">
                        Create the &apos;products&apos; Table in Supabase
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Paste this SQL script into the <strong>SQL Editor</strong> in your Supabase project.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
                        setIsCopiedSql(true);
                        setTimeout(() => setIsCopiedSql(false), 2500);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#FAF3E0] hover:bg-[#8F6D2C] text-[#8F6D2C] hover:text-white border border-[#DEC9A2] font-bold text-xs uppercase tracking-wider transition flex items-center space-x-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isCopiedSql ? "Copied SQL!" : "Copy SQL Script"}</span>
                    </button>
                  </div>

                  <div className="relative rounded-2xl bg-stone-900 text-emerald-300 p-4 font-mono text-[11px] max-h-64 overflow-y-auto leading-relaxed border border-stone-800">
                    <pre>{SUPABASE_SCHEMA_SQL}</pre>
                  </div>

                  <p className="text-[11px] text-stone-400">
                    File also saved locally in your repository at <code>supabase_schema.sql</code>.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-[#E8DFC8] bg-[#FAF9F5] flex justify-end">
              <button
                type="button"
                onClick={() => setIsSupabaseModalOpen(false)}
                className="px-5 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CLOUDINARY CONFIGURATION MODAL */}
      {isCloudinaryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] border border-[#DEC9A2] rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E8DFC8] bg-[#FAF3E0] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-sky-100 text-sky-800 border border-sky-300">
                  <Cloud className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Cloudinary Media Storage Configuration
                  </h3>
                  <p className="text-xs text-stone-500">
                    Store high-definition product images directly in Cloudinary and save their CDN string URLs.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCloudinaryModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 overflow-y-auto">
              {/* Info Banner */}
              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Permanent CDN URLs stored as Strings</p>
                  <p className="text-[11px] text-sky-800">
                    Every uploaded product image gets an optimized, fast HTTPS string URL (e.g. <code className="bg-sky-100 px-1 py-0.5 rounded text-sky-900 font-mono">https://res.cloudinary.com/...</code>) which is stored directly in your Supabase database.
                  </p>
                </div>
              </div>

              {/* Cloud Name */}
              <div className="space-y-1">
                <label className="font-semibold text-xs text-stone-800">
                  Cloudinary Cloud Name *
                </label>
                <input
                  type="text"
                  value={cloudinaryCloudNameInput}
                  onChange={(e) => setCloudinaryCloudNameInput(e.target.value)}
                  placeholder="e.g. djx7890abc"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono text-xs focus:outline-hidden focus:border-sky-500"
                />
                <p className="text-[10px] text-stone-400">
                  Found in your Cloudinary Dashboard under Account Details.
                </p>
              </div>

              {/* Upload Preset */}
              <div className="space-y-1">
                <label className="font-semibold text-xs text-stone-800">
                  Unsigned Upload Preset *
                </label>
                <input
                  type="text"
                  value={cloudinaryPresetInput}
                  onChange={(e) => setCloudinaryPresetInput(e.target.value)}
                  placeholder="e.g. yashraj_products or ml_default"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-stone-300 text-stone-900 font-mono text-xs focus:outline-hidden focus:border-sky-500"
                />
                <p className="text-[10px] text-stone-400">
                  Created under Cloudinary: <strong>Settings &gt; Upload &gt; Upload presets &gt; Add Preset</strong> (Signing Mode: <strong>Unsigned</strong>).
                </p>
              </div>

              {/* Step by Step Help */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 text-xs space-y-2">
                <p className="font-bold text-[11px] uppercase tracking-wider text-[#8F6D2C]">
                  How to get your free Cloudinary preset (1-Minute Guide):
                </p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600">
                  <li>Log in to <a href="https://console.cloudinary.com" target="_blank" rel="noreferrer" className="text-sky-700 underline font-semibold">cloudinary.com</a>.</li>
                  <li>Copy your <strong>Cloud Name</strong> from the Dashboard home.</li>
                  <li>Click the <strong>Settings (Gear Icon) &gt; Upload</strong> tab.</li>
                  <li>Scroll down to <strong>Upload Presets</strong>, click <strong>Add upload preset</strong>.</li>
                  <li>Change Signing Mode to <strong>Unsigned</strong> and click <strong>Save</strong>.</li>
                  <li>Paste the Preset Name above and click Save Settings below!</li>
                </ol>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-[#E8DFC8] bg-[#FAF9F5] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsCloudinaryModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs uppercase tracking-wider hover:bg-stone-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveCloudinarySettings}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white font-bold text-xs uppercase tracking-wider shadow transition cursor-pointer"
              >
                Save Cloudinary Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
