"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, METALS, OCCASIONS } from "../data/products";
import { useStore } from "../context/StoreContext";
import ProductCard from "./ProductCard";
import { Filter, SlidersHorizontal, ArrowUpDown, Sparkles, Image as ImageIcon, X, ArrowRight } from "lucide-react";

export default function ProductGridSection() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedMetal,
    setSelectedMetal,
    selectedOccasion,
    setSelectedOccasion,
    searchQuery,
    products,
  } = useStore();

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [priceRange, setPriceRange] = useState<string>("all");

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.metal.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Metal
      if (selectedMetal !== "all" && item.metal !== selectedMetal) {
        return false;
      }

      // Occasion
      if (selectedOccasion !== "all" && item.occasion !== selectedOccasion) {
        return false;
      }

      // Price Range
      if (priceRange === "under-25k" && item.price >= 25000) return false;
      if (priceRange === "25k-50k" && (item.price < 25000 || item.price > 50000)) return false;
      if (priceRange === "50k-1l" && (item.price < 50000 || item.price > 100000)) return false;
      if (priceRange === "1l-2l" && (item.price < 100000 || item.price > 200000)) return false;
      if (priceRange === "above-2l" && item.price < 200000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedMetal, selectedOccasion, priceRange, sortBy, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedMetal !== "all" ||
    selectedOccasion !== "all" ||
    priceRange !== "all" ||
    searchQuery.trim() !== "";

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedMetal("all");
    setSelectedOccasion("all");
    setPriceRange("all");
  };

  return (
    <section id="collection-section" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* User Image Replacement Notice Banner */}
        <div className="mb-10 p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700 shadow-2xs">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#8F6D2C] text-white rounded-lg">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-900">
                Ready for your custom jewellery photos
              </p>
              <p className="text-stone-500 text-[11px]">
                High-definition jewellery demonstration placeholders are loaded. You can replace images at any time by updating <code className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-900 font-mono">app/data/products.ts</code> or dropping them into <code className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-900 font-mono">public/images/</code>.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#8F6D2C] uppercase tracking-wider shrink-0 bg-white px-3 py-1.5 rounded-full border border-stone-200">
            100% Modifiable
          </span>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8F6D2C]">
            Pure Quality • Perfect Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
            Our Jewellery Collection
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
            Explore 100% BIS Hallmarked gold, certified diamonds, and handcrafted silver ornaments.
          </p>
        </div>

        {/* 1. FILTER CONTROLS & TABS */}
        <div className="space-y-4 mb-8">
          {/* Metal Tabs (Pills) */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {METALS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMetal(m.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  selectedMetal === m.id
                    ? "bg-[#8F6D2C] text-white shadow-md shadow-[#8F6D2C]/20"
                    : "bg-white text-stone-700 border border-[#E0D5C1] hover:border-[#8F6D2C]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Category Horizontal Scroll Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? "bg-[#1F170F] text-[#F5E8CB] font-bold"
                    : "bg-stone-100 text-stone-700 hover:bg-[#FAF3E0] hover:text-[#8F6D2C]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub-Filters: Occasion, Price Bracket, Sort By */}
          <div className="bg-white p-4 rounded-xl border border-[#E8DFC8] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Occasion */}
              <div className="flex items-center space-x-1.5">
                <span className="text-stone-500 font-medium">Occasion:</span>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="bg-[#FAF8F5] border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:outline-hidden focus:border-[#8F6D2C]"
                >
                  {OCCASIONS.map((occ) => (
                    <option key={occ.id} value={occ.id}>
                      {occ.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Bracket */}
              <div className="flex items-center space-x-1.5">
                <span className="text-stone-500 font-medium">Price:</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-[#FAF8F5] border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 font-medium focus:outline-hidden focus:border-[#8F6D2C]"
                >
                  <option value="all">All Prices</option>
                  <option value="under-25k">Under ₹25,000</option>
                  <option value="25k-50k">₹25,000 - ₹50,000</option>
                  <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                  <option value="1l-2l">₹1,00,000 - ₹2,00,000</option>
                  <option value="above-2l">Above ₹2,00,000 (Royal)</option>
                </select>
              </div>

              {/* Reset button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-stone-500 hover:text-rose-600 flex items-center space-x-1 underline"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center space-x-3 ml-auto">
              <span className="text-stone-500">
                Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items
              </span>
              <div className="flex items-center space-x-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAF8F5] border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 font-semibold focus:outline-hidden focus:border-[#8F6D2C]"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated & Verified</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PRODUCT CARDS GRID */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Link to Full Catalogue Page */}
            <div className="mt-12 text-center">
              <Link
                href="/products"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-stone-950 font-bold text-xs uppercase tracking-widest hover:shadow-xl hover:brightness-105 transition-all"
              >
                <span>View Full Imperial Catalogue &amp; Advanced Filters</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#DFCBA5] p-8">
            <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-900">
              No matching jewellery found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
              We couldn&apos;t find any pieces matching your specific filter criteria. Try resetting filters to explore our full collection.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-full bg-[#8F6D2C] text-white text-xs font-semibold"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
