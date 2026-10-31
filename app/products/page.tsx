"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";
import {
  CATEGORIES,
  METALS,
  OCCASIONS,
  LIVE_RATES,
  Product,
} from "../data/products";
import {
  Search,
  SlidersHorizontal,
  X,
  Filter,
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  Grid3X3,
  LayoutGrid,
  Check,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Gem,
  Award,
  Truck,
  PhoneCall,
  Flame,
} from "lucide-react";

const GENDERS = [
  { id: "all", label: "All Genders" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "kids", label: "Kids" },
  { id: "unisex", label: "Unisex / Bullion" },
];

const WEIGHT_RANGES = [
  { id: "all", label: "All Weights" },
  { id: "under-5", label: "Lightweight (< 5g)" },
  { id: "5-15", label: "Medium (5g - 15g)" },
  { id: "15-30", label: "Heavy (15g - 30g)" },
  { id: "above-30", label: "Grand Bridal (30g+)" },
];

const POPULAR_SEARCH_TAGS = [
  "Antique Choker",
  "Tarakasi",
  "Solitaire Ring",
  "Gold Coin",
  "Mangalsutra",
  "Temple Jhumka",
  "Tennis Bracelet",
  "Navratna",
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products } = useStore();

  // Search & Filter State
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialMetal = searchParams.get("metal") || "all";
  const initialOccasion = searchParams.get("occasion") || "all";
  const initialGender = searchParams.get("gender") || "all";
  const initialPrice = searchParams.get("price") || "all";
  const initialSort = searchParams.get("sort") || "featured";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedMetal, setSelectedMetal] = useState(initialMetal);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [selectedWeight, setSelectedWeight] = useState("all");
  const [priceRange, setPriceRange] = useState(initialPrice);
  const [maxPriceSlider, setMaxPriceSlider] = useState<number>(600000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<
    "featured" | "price-asc" | "price-desc" | "rating" | "weight-desc" | "newest"
  >(initialSort as any);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<"standard" | "compact">("standard");

  // Sync state with URL if params change
  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedCategory(searchParams.get("category") || "all");
    }
    if (searchParams.get("metal")) {
      setSelectedMetal(searchParams.get("metal") || "all");
    }
    if (searchParams.get("search")) {
      setSearchQuery(searchParams.get("search") || "");
    }
  }, [searchParams]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat.id] = products.filter((p) => p.category === cat.id).length;
    });
    return counts;
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesMetal = product.metal.toLowerCase().includes(q);
        const matchesCode = product.code.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTag = product.tag ? product.tag.toLowerCase().includes(q) : false;
        const matchesPurity = product.purity.toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesCategory &&
          !matchesMetal &&
          !matchesCode &&
          !matchesDesc &&
          !matchesTag &&
          !matchesPurity
        ) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // 3. Metal
      if (selectedMetal !== "all" && product.metal !== selectedMetal) {
        return false;
      }

      // 4. Occasion
      if (selectedOccasion !== "all" && product.occasion !== selectedOccasion) {
        return false;
      }

      // 5. Gender
      if (selectedGender !== "all" && product.gender !== selectedGender && product.gender !== "unisex") {
        return false;
      }

      // 6. Stock
      if (onlyInStock && !product.inStock) {
        return false;
      }

      // 7. Weight Range
      if (selectedWeight === "under-5" && product.grossWeight >= 5) return false;
      if (selectedWeight === "5-15" && (product.grossWeight < 5 || product.grossWeight > 15)) return false;
      if (selectedWeight === "15-30" && (product.grossWeight < 15 || product.grossWeight > 30)) return false;
      if (selectedWeight === "above-30" && product.grossWeight < 30) return false;

      // 8. Price Preset Range
      if (priceRange === "under-25k" && product.price >= 25000) return false;
      if (priceRange === "25k-50k" && (product.price < 25000 || product.price > 50000)) return false;
      if (priceRange === "50k-1l" && (product.price < 50000 || product.price > 100000)) return false;
      if (priceRange === "1l-2l" && (product.price < 100000 || product.price > 200000)) return false;
      if (priceRange === "above-2l" && product.price < 200000) return false;

      // 9. Price Slider
      if (product.price > maxPriceSlider) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "weight-desc") return b.grossWeight - a.grossWeight;
      if (sortBy === "newest") {
        const aIsNew = a.tag === "New Arrival" ? 1 : 0;
        const bIsNew = b.tag === "New Arrival" ? 1 : 0;
        return bIsNew - aIsNew;
      }
      // "featured" default: Bestsellers and Heritage Bridal first
      const aScore = a.tag === "Heritage Bridal" ? 3 : a.tag === "Bestseller" ? 2 : 1;
      const bScore = b.tag === "Heritage Bridal" ? 3 : b.tag === "Bestseller" ? 2 : 1;
      return bScore - aScore;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedMetal,
    selectedOccasion,
    selectedGender,
    selectedWeight,
    priceRange,
    maxPriceSlider,
    onlyInStock,
    sortBy,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedMetal !== "all" ||
    selectedOccasion !== "all" ||
    selectedGender !== "all" ||
    selectedWeight !== "all" ||
    priceRange !== "all" ||
    maxPriceSlider < 600000 ||
    onlyInStock;

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedMetal("all");
    setSelectedOccasion("all");
    setSelectedGender("all");
    setSelectedWeight("all");
    setPriceRange("all");
    setMaxPriceSlider(600000);
    setOnlyInStock(false);
    setSortBy("featured");
    router.replace("/products");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] selection:bg-[#DFBA73]/30 text-[#1A130B]">
      <Navbar />

      {/* 1. LUXURY REGAL BREADCRUMB & HERO BANNER (COMPACT) */}
      <section className="relative bg-gradient-to-r from-[#072016] via-[#0B2C20] to-[#041710] text-white pt-3.5 pb-4 border-b border-[#DFBA73]/40 overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBA73_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-1.5 text-[11px] text-[#DFC99D] mb-1.5 font-medium tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#C5A059]" />
            <Link href="/products" className="hover:text-white transition-colors">
              Jewellery Catalogue
            </Link>
            {selectedCategory !== "all" && (
              <>
                <ChevronRight className="w-3 h-3 text-[#C5A059]" />
                <span className="text-white font-bold capitalize">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.label || selectedCategory}
                </span>
              </>
            )}
            {selectedMetal !== "all" && (
              <>
                <ChevronRight className="w-3 h-3 text-[#C5A059]" />
                <span className="text-[#DFBA73] font-bold capitalize">
                  {METALS.find((m) => m.id === selectedMetal)?.label || selectedMetal}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#DFBA73]/20 border border-[#DFBA73]/40 text-[#F5E8CB] text-[10px] font-semibold uppercase tracking-wider mb-1.5 backdrop-blur-xs">
                <Sparkles className="w-3 h-3 text-[#DFBA73]" />
                <span>100% BIS 916 Hallmarked &amp; Certified Ornaments</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Imperial Jewellery{" "}
                <span className="text-gold-gradient font-serif italic font-normal">
                  Collection
                </span>
              </h1>
              <p className="mt-1 text-xs text-emerald-100/75 max-w-2xl font-light leading-snug line-clamp-1 sm:line-clamp-none">
                Explore handpicked bridal sets, daily 22K gold elegance, certified natural diamond solitaires,
                and authentic GI-tagged Cuttack Tarakasi silver filigree with direct wholesale transparent billing.
              </p>
            </div>

            {/* Live Gold Rate Chip in Header (Compact) */}
            <div className="flex items-center space-x-2.5 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#DFBA73]/30 self-start md:self-auto shrink-0 shadow">
              <div className="p-1.5 bg-[#DFBA73]/20 rounded-lg text-[#DFBA73]">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[9px] text-emerald-200/70 uppercase tracking-widest font-bold">
                  Today&apos;s Live Gold Rate
                </p>
                <p className="text-xs font-bold text-white font-mono">
                  22K: ₹{LIVE_RATES.gold22k}/g • 24K: ₹{LIVE_RATES.gold24k}/g
                </p>
              </div>
            </div>
          </div>

          {/* Quick Categories Pills Strip */}
          <div className="mt-3.5 pt-3 border-t border-[#DFBA73]/15 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#DFBA73] to-[#C5A059] text-stone-950 font-bold shadow-xs scale-102"
                      : "bg-[#052317]/80 hover:bg-[#DFBA73]/20 text-[#E8F3EE] border border-[#DFBA73]/25"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-stone-900/20 text-stone-950 font-mono font-bold"
                        : "bg-black/30 text-[#DFBA73] font-mono"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. MAIN CATALOG BODY: SEARCH + FILTERS + GRID */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Top Control Bar: Search Input & Sort & Layout */}
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-4 sm:p-5 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8F6D2C]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by jewellery name, purity, code (e.g. YJ-BRD-8821), or filigree..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF9F5] border border-[#DEC9A2] text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Trigger (Mobile) + Sort Dropdown + View Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3 justify-between lg:justify-end">
              {/* Mobile Filter Trigger Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2.5 rounded-xl bg-[#FAF3E0] text-[#7A5B1F] border border-[#DEC9A2] text-xs font-bold flex items-center space-x-1.5 shadow-2xs hover:bg-[#DFBA73]/20"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                )}
              </button>

              {/* Sort By Select */}
              <div className="flex items-center space-x-2 bg-[#FAF9F5] border border-[#DEC9A2] rounded-xl px-3 py-2 text-xs text-stone-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#8F6D2C] shrink-0" />
                <label htmlFor="sortSelect" className="font-semibold text-stone-500 whitespace-nowrap hidden sm:inline">
                  Sort:
                </label>
                <select
                  id="sortSelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium text-stone-900 focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Curator&apos;s Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="weight-desc">Gold Weight (Heavy to Light)</option>
                  <option value="newest">New Arrivals First</option>
                </select>
              </div>

              {/* Grid Layout Toggle */}
              <div className="hidden sm:flex items-center space-x-1 bg-[#FAF9F5] p-1 rounded-xl border border-[#DEC9A2]">
                <button
                  onClick={() => setGridCols("standard")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    gridCols === "standard"
                      ? "bg-white text-[#8F6D2C] shadow-xs font-bold"
                      : "text-stone-400 hover:text-stone-700"
                  }`}
                  title="Standard Grid (3-4 Columns)"
                  aria-label="Standard Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols("compact")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    gridCols === "compact"
                      ? "bg-white text-[#8F6D2C] shadow-xs font-bold"
                      : "text-stone-400 hover:text-stone-700"
                  }`}
                  title="Compact Grid"
                  aria-label="Compact Grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Popular Search Suggestions */}
          <div className="mt-3 pt-3 border-t border-[#F2ECE1] flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-stone-400 text-[11px] font-semibold flex items-center mr-1">
              <Sparkles className="w-3 h-3 mr-1 text-[#C5A059]" />
              Popular:
            </span>
            {POPULAR_SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] transition-colors cursor-pointer ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? "bg-[#C5A059] text-white font-bold"
                    : "bg-[#F5EFEB] hover:bg-[#EBDDC3] text-stone-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3. ACTIVE FILTER CHIPS (IF ANY) */}
        {hasActiveFilters && (
          <div className="mb-6 p-3.5 bg-[#FAF3E0] rounded-xl border border-[#DEC9A2] flex flex-wrap items-center justify-between gap-3 animate-fade-in text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-[#8F6D2C] uppercase tracking-wider text-[11px] flex items-center">
                <Filter className="w-3 h-3 mr-1" />
                Active Filters ({filteredProducts.length} results):
              </span>

              {searchQuery && (
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-full border border-[#DEC9A2] text-stone-800 font-medium">
                  &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => setSearchQuery("")} className="ml-1.5 text-stone-400 hover:text-stone-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory !== "all" && (
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-full border border-[#DEC9A2] text-stone-800 font-medium capitalize">
                  Category: {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory("all")} className="ml-1.5 text-stone-400 hover:text-stone-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedMetal !== "all" && (
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-full border border-[#DEC9A2] text-stone-800 font-medium capitalize">
                  Metal: {METALS.find((m) => m.id === selectedMetal)?.label}
                  <button onClick={() => setSelectedMetal("all")} className="ml-1.5 text-stone-400 hover:text-stone-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedOccasion !== "all" && (
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-full border border-[#DEC9A2] text-stone-800 font-medium capitalize">
                  Occasion: {OCCASIONS.find((o) => o.id === selectedOccasion)?.label}
                  <button onClick={() => setSelectedOccasion("all")} className="ml-1.5 text-stone-400 hover:text-stone-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedGender !== "all" && (
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-full border border-[#DEC9A2] text-stone-800 font-medium capitalize">
                  Gender: {selectedGender}
                  <button onClick={() => setSelectedGender("all")} className="ml-1.5 text-stone-400 hover:text-stone-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedWeight !== "all" && (
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-full border border-[#DEC9A2] text-stone-800 font-medium">
                  Weight: {WEIGHT_RANGES.find((w) => w.id === selectedWeight)?.label}
                  <button onClick={() => setSelectedWeight("all")} className="ml-1.5 text-stone-400 hover:text-stone-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {priceRange !== "all" && (
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-full border border-[#DEC9A2] text-stone-800 font-medium">
                  Price: {priceRange}
                  <button onClick={() => setPriceRange("all")} className="ml-1.5 text-stone-400 hover:text-stone-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {maxPriceSlider < 600000 && (
                <span className="inline-flex items-center bg-white px-2.5 py-1 rounded-full border border-[#DEC9A2] text-stone-800 font-medium">
                  Max: ₹{maxPriceSlider.toLocaleString("en-IN")}
                  <button onClick={() => setMaxPriceSlider(600000)} className="ml-1.5 text-stone-400 hover:text-stone-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={clearAllFilters}
              className="text-[#8F6D2C] hover:text-stone-900 font-bold underline flex items-center space-x-1 shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* 4. MAIN TWO-COLUMN LAYOUT: DESKTOP SIDEBAR + PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8DFC8] p-5 shadow-xs divide-y divide-[#F2ECE1]">
              {/* Header */}
              <div className="pb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#8F6D2C]" />
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Filter Catalogue
                  </h3>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[11px] font-bold text-[#8F6D2C] hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* 1. Metal & Purity */}
              <div className="py-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F6D2C]">
                  Metal & Purity
                </h4>
                <div className="space-y-1.5 text-xs text-stone-700">
                  {METALS.map((metal) => (
                    <label
                      key={metal.id}
                      className="flex items-center space-x-2.5 cursor-pointer hover:text-stone-950 py-1"
                    >
                      <input
                        type="radio"
                        name="metalRadio"
                        checked={selectedMetal === metal.id}
                        onChange={() => setSelectedMetal(metal.id)}
                        className="accent-[#C5A059] w-4 h-4 cursor-pointer"
                      />
                      <span className={selectedMetal === metal.id ? "font-bold text-stone-900" : ""}>
                        {metal.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Price Range Options */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F6D2C]">
                    Price Budget
                  </h4>
                  <span className="text-[11px] font-mono text-stone-500">
                    Up to ₹{(maxPriceSlider / 1000).toFixed(0)}k
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="20000"
                  max="600000"
                  step="10000"
                  value={maxPriceSlider}
                  onChange={(e) => {
                    setMaxPriceSlider(Number(e.target.value));
                    setPriceRange("all");
                  }}
                  className="w-full accent-[#C5A059] cursor-pointer"
                />

                <div className="grid grid-cols-2 gap-1.5 pt-2 text-[11px]">
                  {[
                    { id: "all", label: "Any Price" },
                    { id: "under-25k", label: "Under ₹25k" },
                    { id: "25k-50k", label: "₹25k - ₹50k" },
                    { id: "50k-1l", label: "₹50k - ₹1L" },
                    { id: "1l-2l", label: "₹1L - ₹2L" },
                    { id: "above-2l", label: "Above ₹2L" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPriceRange(p.id);
                        setMaxPriceSlider(600000);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg border text-center transition-colors ${
                        priceRange === p.id
                          ? "bg-[#C5A059] text-white border-[#C5A059] font-bold"
                          : "bg-[#FAF9F5] border-[#DEC9A2] text-stone-700 hover:bg-[#FAF3E0]"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Occasion */}
              <div className="py-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F6D2C]">
                  Occasion & Purpose
                </h4>
                <div className="space-y-1.5 text-xs text-stone-700">
                  {OCCASIONS.map((occ) => (
                    <label
                      key={occ.id}
                      className="flex items-center space-x-2.5 cursor-pointer hover:text-stone-950 py-1"
                    >
                      <input
                        type="radio"
                        name="occasionRadio"
                        checked={selectedOccasion === occ.id}
                        onChange={() => setSelectedOccasion(occ.id)}
                        className="accent-[#C5A059] w-4 h-4 cursor-pointer"
                      />
                      <span className={selectedOccasion === occ.id ? "font-bold text-stone-900" : ""}>
                        {occ.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Gender / Persona */}
              <div className="py-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F6D2C]">
                  Who Is It For?
                </h4>
                <div className="space-y-1.5 text-xs text-stone-700">
                  {GENDERS.map((g) => (
                    <label
                      key={g.id}
                      className="flex items-center space-x-2.5 cursor-pointer hover:text-stone-950 py-1"
                    >
                      <input
                        type="radio"
                        name="genderRadio"
                        checked={selectedGender === g.id}
                        onChange={() => setSelectedGender(g.id)}
                        className="accent-[#C5A059] w-4 h-4 cursor-pointer"
                      />
                      <span className={selectedGender === g.id ? "font-bold text-stone-900" : ""}>
                        {g.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. Gold Weight Range */}
              <div className="py-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F6D2C]">
                  Gold Weight
                </h4>
                <div className="space-y-1.5 text-xs text-stone-700">
                  {WEIGHT_RANGES.map((w) => (
                    <label
                      key={w.id}
                      className="flex items-center space-x-2.5 cursor-pointer hover:text-stone-950 py-1"
                    >
                      <input
                        type="radio"
                        name="weightRadio"
                        checked={selectedWeight === w.id}
                        onChange={() => setSelectedWeight(w.id)}
                        className="accent-[#C5A059] w-4 h-4 cursor-pointer"
                      />
                      <span className={selectedWeight === w.id ? "font-bold text-stone-900" : ""}>
                        {w.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In stock toggle */}
              <div className="pt-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-[#C5A059] w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-stone-800">
                    Ready for Instant Dispatch (In Stock)
                  </span>
                </label>
              </div>
            </div>

            {/* Yashraj Promises Callout Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF3E0] to-[#F5E8CB] border border-[#DFC9A2] space-y-3 text-xs text-stone-800 shadow-2xs">
              <div className="flex items-center space-x-2 text-[#8F6D2C] font-bold uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>The Yashraj Purity Promise</span>
              </div>
              <ul className="space-y-2 text-[11px] text-stone-700">
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>100% BIS 916 Hallmark with Unique Laser HUID</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Transparent Price Breakup with Minimal Making Charges</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>100% Lifetime Exchange on All Diamond & Gold Ornaments</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* PRODUCT CARDS GRID */}
          <section className="lg:col-span-3">
            {/* Header info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                Showing <strong className="text-stone-900">{filteredProducts.length}</strong> of{" "}
                <span className="font-mono">{products.length}</span> Masterpieces
              </p>
              {selectedCategory !== "all" && (
                <span className="text-xs text-[#8F6D2C] font-semibold uppercase tracking-wider hidden sm:inline">
                  Viewing: {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                </span>
              )}
            </div>

            {/* Grid display */}
            {filteredProducts.length > 0 ? (
              <div
                className={`grid gap-5 sm:gap-6 ${
                  gridCols === "compact"
                    ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="bg-white rounded-3xl border border-[#DEC9A2] p-12 text-center shadow-xs space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF3E0] flex items-center justify-center text-[#8F6D2C] border border-[#DEC9A2]">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  No matching jewellery found
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  We couldn&apos;t find any ornaments matching your filter criteria. Try adjusting your search query, price budget, or resetting all filters.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-950 font-bold text-xs uppercase tracking-wider shadow hover:shadow-md transition cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                  <a
                    href="https://wa.me/917008343796?text=Hello%20Yashraj%20Jewellers,%20I%20am%20looking%20for%20a%20custom%20jewellery%20design%20that%20I%20could%20not%20find%20online."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow transition flex items-center space-x-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Request Custom Karigari</span>
                  </a>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* 5. MOBILE SLIDE-OUT FILTER DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in lg:hidden">
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 px-6 border-b border-[#E8DFC8] flex items-center justify-between bg-[#FAF9F5]">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8F6D2C]" />
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Filter Products
                </h3>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-stone-200 text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-stone-700">
              {/* Category */}
              <div>
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider mb-2">
                  Category
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`p-2 rounded-lg text-left text-xs border ${
                        selectedCategory === c.id
                          ? "bg-[#C5A059] text-white border-[#C5A059] font-bold"
                          : "bg-stone-50 border-stone-200"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal */}
              <div>
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider mb-2">
                  Metal & Purity
                </h4>
                <div className="space-y-1.5">
                  {METALS.map((m) => (
                    <label key={m.id} className="flex items-center space-x-2 py-1">
                      <input
                        type="radio"
                        checked={selectedMetal === m.id}
                        onChange={() => setSelectedMetal(m.id)}
                        className="accent-[#C5A059]"
                      />
                      <span>{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider mb-2">
                  Occasion
                </h4>
                <div className="space-y-1.5">
                  {OCCASIONS.map((o) => (
                    <label key={o.id} className="flex items-center space-x-2 py-1">
                      <input
                        type="radio"
                        checked={selectedOccasion === o.id}
                        onChange={() => setSelectedOccasion(o.id)}
                        className="accent-[#C5A059]"
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider mb-2">
                  Gender
                </h4>
                <div className="space-y-1.5">
                  {GENDERS.map((g) => (
                    <label key={g.id} className="flex items-center space-x-2 py-1">
                      <input
                        type="radio"
                        checked={selectedGender === g.id}
                        onChange={() => setSelectedGender(g.id)}
                        className="accent-[#C5A059]"
                      />
                      <span>{g.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Buttons */}
            <div className="p-4 border-t border-[#E8DFC8] bg-[#FAF9F5] flex space-x-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold uppercase tracking-wider text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-950 font-bold uppercase tracking-wider text-xs shadow"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. TRUST & ASSURANCE FOOTER STRIP */}
      <section className="bg-white border-t border-[#E8DFC8] py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E0] flex items-center justify-center text-[#8F6D2C]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                100% BIS Hallmarked
              </h5>
              <p className="text-xs text-stone-500">
                Govt. certified laser HUID hallmarking on every gram.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E0] flex items-center justify-center text-[#8F6D2C]">
                <Award className="w-6 h-6" />
              </div>
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                Transparent Billing
              </h5>
              <p className="text-xs text-stone-500">
                Itemized weight, making charge, and GST breakdown.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E0] flex items-center justify-center text-[#8F6D2C]">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                Lifetime Exchange
              </h5>
              <p className="text-xs text-stone-500">
                Zero deduction on 22K/24K old gold buyback and upgrades.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF3E0] flex items-center justify-center text-[#8F6D2C]">
                <Truck className="w-6 h-6" />
              </div>
              <h5 className="font-serif font-bold text-stone-900 text-sm">
                Insured Pan-India Transit
              </h5>
              <p className="text-xs text-stone-500">
                Dispatched with BlueDart &amp; Malca-Amit tamper-proof seal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-[#8F6D2C] text-sm">Loading Yashraj Imperial Catalogue...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
