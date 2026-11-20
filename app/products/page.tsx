"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductPageLoader from "../components/ProductPageLoader";
import { useStore } from "../context/StoreContext";
import {
  CATEGORIES,
  METALS,
  OCCASIONS,
  LIVE_RATES,
  Product,
  matchesProductSearch,
} from "../data/products";
import {
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  ShieldCheck,
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



function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, isLoadingProducts } = useStore();

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
  const [onlyInStock, setOnlyInStock] = useState(true);
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

  // Lock background page scroll when filter drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalBodyOverflow || "";
        document.documentElement.style.overflow = originalHtmlOverflow || "";
        document.body.style.touchAction = originalBodyTouchAction || "";
      };
    }
  }, [isMobileFilterOpen]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query (Multi-word, synonyms, code, purity, category)
      if (searchQuery.trim() && !matchesProductSearch(product, searchQuery)) {
        return false;
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

      // 6. Stock: only filter out if explicitly marked out of stock
      if (onlyInStock && product.inStock === false) {
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
    products,
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
    !onlyInStock;

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedMetal("all");
    setSelectedOccasion("all");
    setSelectedGender("all");
    setSelectedWeight("all");
    setPriceRange("all");
    setMaxPriceSlider(600000);
    setOnlyInStock(true);
    setSortBy("featured");
    router.replace("/products");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] selection:bg-[#DFBA73]/30 text-[#1A130B]">
      <Navbar />

      {/* 1. LUXURY REGAL BREADCRUMB & HERO BANNER */}
      <section className="relative bg-gradient-to-r from-[#072016] via-[#0B2C20] to-[#041710] text-white py-8 sm:py-12 border-b border-[#DFBA73]/40 overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFBA73_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs text-[#DFC99D] mb-3 font-medium tracking-wide">
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

          <div className="flex flex-col justify-center">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#DFBA73]/20 border border-[#DFBA73]/40 text-[#F5E8CB] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2.5 backdrop-blur-xs">
                <Sparkles className="w-3 h-3 text-[#DFBA73]" />
                <span>100% BIS 916 Hallmarked &amp; Certified Ornaments</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Imperial Jewellery{" "}
                <span className="text-gold-gradient font-serif italic font-normal">
                  Collection
                </span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-emerald-100/80 max-w-2xl font-light leading-relaxed">
                Explore handpicked bridal sets, daily 22K gold elegance, certified natural diamond solitaires,
                and authentic GI-tagged Cuttack Tarakasi silver filigree with direct wholesale transparent billing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CATALOG BODY: FULL WIDTH GRID + SLIDE-OUT FILTER DRAWER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1 w-full">
        {/* FULL WIDTH CATALOG LAYOUT */}
        <section className="w-full">
          {/* Header toolbar: Filter Trigger Button */}
          <div className="flex items-center justify-end space-x-3 mb-6 pb-4 border-b border-[#E8DFC8]">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline cursor-pointer"
              >
                Clear All
              </button>
            )}

            {/* Filter Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="px-4 py-2 rounded-xl bg-white text-[#7A5B1F] border border-[#DEC9A2] hover:bg-[#FAF3E0] hover:border-[#8F6D2C] text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-xs transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8F6D2C]" />
              <span>Filter</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              )}
            </button>
          </div>

          {/* Active Search / Category Filter Pill Indicator */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="flex flex-wrap items-center gap-2 mb-4 -mt-2">
              {searchQuery && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FAF3E0] border border-[#DEC9A2] text-xs text-[#7A5B1F] font-medium">
                  <span>Search: <strong>&ldquo;{searchQuery}&rdquo;</strong></span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-stone-950 p-0.5 rounded-full cursor-pointer"
                    aria-label="Clear search query"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-700 font-medium">
                  <span>Category: <strong>{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</strong></span>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="hover:text-stone-950 p-0.5 rounded-full cursor-pointer"
                    aria-label="Clear category"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Grid display: 4x4 layout */}
          {isLoadingProducts && products.length === 0 ? (
            <ProductPageLoader message="Loading Jewellery Catalogue..." />
          ) : filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      </main>

      {/* 5. SLIDE-OUT FILTER DRAWER (DESKTOP & MOBILE) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div
            className="fixed top-0 right-0 bottom-0 z-10 w-full max-w-md bg-white shadow-2xl flex flex-col h-screen max-h-screen overflow-hidden animate-slide-left"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="shrink-0 p-4 px-6 border-b border-[#E8DFC8] flex items-center justify-between bg-[#FAF9F5] z-10">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8F6D2C]" />
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Filter Catalogue
                </h3>
              </div>
              <div className="flex items-center space-x-3">
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-[#8F6D2C] hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Scrollable Content */}
            <div
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 space-y-6 text-xs text-stone-700 divide-y divide-[#F2ECE1]"
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Search Inside Filter Drawer */}
              <div className="pb-2">
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider mb-2 text-xs">
                  Search Catalogue
                </h4>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, code, metal..."
                    className="w-full pl-8 pr-7 py-2 rounded-xl bg-white border border-[#DEC9A2] text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-[#C5A059]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#8F6D2C] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider mb-2.5 text-xs">
                  Category
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`p-2 rounded-xl text-left text-xs border transition-colors cursor-pointer ${
                        selectedCategory === c.id
                          ? "bg-[#C5A059] text-white border-[#C5A059] font-bold shadow-xs"
                          : "bg-[#FAF9F5] border-[#DEC9A2] text-stone-800 hover:bg-[#FAF3E0]"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal & Purity */}
              <div className="pt-4 space-y-2">
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider text-xs">
                  Metal & Purity
                </h4>
                <div className="space-y-1.5">
                  {METALS.map((m) => (
                    <label key={m.id} className="flex items-center space-x-2.5 py-1 cursor-pointer hover:text-stone-950">
                      <input
                        type="radio"
                        name="drawerMetal"
                        checked={selectedMetal === m.id}
                        onChange={() => setSelectedMetal(m.id)}
                        className="accent-[#C5A059] w-4 h-4 cursor-pointer"
                      />
                      <span className={selectedMetal === m.id ? "font-bold text-stone-900" : ""}>
                        {m.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Budget */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider text-xs">
                    Price Budget
                  </h4>
                  <span className="text-xs font-mono text-stone-600 font-semibold">
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

                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
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
                      className={`px-2.5 py-1.5 rounded-lg border text-center transition-colors cursor-pointer ${
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

              {/* Occasion & Purpose */}
              <div className="pt-4 space-y-2">
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider text-xs">
                  Occasion & Purpose
                </h4>
                <div className="space-y-1.5">
                  {OCCASIONS.map((o) => (
                    <label key={o.id} className="flex items-center space-x-2.5 py-1 cursor-pointer hover:text-stone-950">
                      <input
                        type="radio"
                        name="drawerOccasion"
                        checked={selectedOccasion === o.id}
                        onChange={() => setSelectedOccasion(o.id)}
                        className="accent-[#C5A059] w-4 h-4 cursor-pointer"
                      />
                      <span className={selectedOccasion === o.id ? "font-bold text-stone-900" : ""}>
                        {o.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Who Is It For? (Gender) */}
              <div className="pt-4 space-y-2">
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider text-xs">
                  Who Is It For?
                </h4>
                <div className="space-y-1.5">
                  {GENDERS.map((g) => (
                    <label key={g.id} className="flex items-center space-x-2.5 py-1 cursor-pointer hover:text-stone-950">
                      <input
                        type="radio"
                        name="drawerGender"
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

              {/* Gold Weight */}
              <div className="pt-4 space-y-2">
                <h4 className="font-bold text-[#8F6D2C] uppercase tracking-wider text-xs">
                  Gold Weight
                </h4>
                <div className="space-y-1.5">
                  {WEIGHT_RANGES.map((w) => (
                    <label key={w.id} className="flex items-center space-x-2.5 py-1 cursor-pointer hover:text-stone-950">
                      <input
                        type="radio"
                        name="drawerWeight"
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

              {/* Yashraj Promises Callout Box */}
              <div className="pt-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FAF3E0] to-[#F5E8CB] border border-[#DFC9A2] space-y-2.5 text-xs text-stone-800 shadow-2xs">
                  <div className="flex items-center space-x-2 text-[#8F6D2C] font-bold uppercase tracking-wider text-[11px]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>The Yashraj Purity Promise</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-stone-700">
                    <li className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>100% BIS 916 Hallmark with HUID</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>Transparent Price Breakup</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>100% Lifetime Exchange</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Drawer Footer Buttons */}
            <div className="shrink-0 p-4 border-t border-[#E8DFC8] bg-[#FAF9F5] flex space-x-3 z-10">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold uppercase tracking-wider text-xs hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-950 font-bold uppercase tracking-wider text-xs shadow hover:shadow-md transition cursor-pointer"
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
