"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../context/StoreContext";
import { CATEGORIES, matchesProductSearch } from "../data/products";
import {
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Percent,
  Calendar,
  Gem,
  Building2,
  Search,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const {
    products,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAppointmentOpen,
    setIsVideoCallOpen,
    setSelectedCategory,
    setSelectedMetal,
    setSelectedOccasion,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [navSearch, setNavSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!navSearch.trim()) return [];
    return products.filter((p) => matchesProductSearch(p, navSearch));
  }, [navSearch, products]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileSearchExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (cat === "all") {
      router.push("/products");
    } else {
      router.push(`/products?category=${cat}`);
    }
  };

  const handleMetalClick = (metal: string) => {
    setSelectedMetal(metal);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (metal === "all") {
      router.push("/products");
    } else {
      router.push(`/products?metal=${metal}`);
    }
  };

  const handleOccasionClick = (occ: string) => {
    setSelectedOccasion(occ);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (occ === "all") {
      router.push("/products");
    } else {
      router.push(`/products?occasion=${occ}`);
    }
  };

  const handleNavSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (navSearch.trim()) {
      setIsSearchOpen(false);
      setIsMobileSearchExpanded(false);
      setIsMobileMenuOpen(false);
      router.push(`/products?search=${encodeURIComponent(navSearch.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200">
        {/* 2. MAIN BRAND HEADER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 lg:gap-5">
          {/* Left Side: LOGO & RESPONSIVE BRAND TITLE */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3.5 group text-left min-w-0 shrink">
            {/* Round Luxury Emblem */}
            <div className="relative w-9 h-9 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-13 lg:h-13 rounded-full overflow-hidden shadow-md border-2 border-[#C5A059]/60 group-hover:border-[#DFBA73] group-hover:scale-105 transition-all duration-300 shrink-0 bg-[#072016]">
              <img
                src="/logo.png"
                alt="Yashraj Jewellers"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Responsive Brand Typography */}
            <div className="flex flex-col min-w-0 justify-center">
              <h1 className="text-base min-[380px]:text-lg sm:text-xl md:text-2xl lg:text-[26px] font-serif font-bold text-[#1A130B] group-hover:text-[#9E7B35] transition-colors leading-none tracking-[0.12em] min-[380px]:tracking-[0.16em] sm:tracking-[0.18em] lg:tracking-[0.22em] uppercase truncate">
                Yashraj
              </h1>
              <p className="text-[8px] min-[360px]:text-[8.5px] sm:text-[10px] md:text-[11px] lg:text-[11.5px] font-sans font-semibold text-[#8F6D2C] uppercase tracking-[0.12em] min-[360px]:tracking-[0.16em] sm:tracking-[0.22em] lg:tracking-[0.28em] whitespace-nowrap leading-none mt-1 sm:mt-1.5">
                <span>Jewellers</span>
                <span className="hidden min-[360px]:inline"> • Est. 1982</span>
              </p>
            </div>
          </Link>

          {/* Center: DESKTOP NAVIGATION DIRECTLY IN HEADER */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center space-x-4 xl:space-x-6 text-[13px] font-semibold text-stone-700">
              {/* 1. All Jewellery */}
              <li className="py-3">
                <button
                  onClick={() => handleCategoryClick("all")}
                  className="hover:text-[#9E7B35] transition-colors py-1 text-stone-800 cursor-pointer"
                >
                  All Jewellery
                </button>
              </li>

              {/* 2. Bracelets */}
              <li className="py-3">
                <button
                  onClick={() => handleCategoryClick("bracelets")}
                  className="hover:text-[#9E7B35] transition-colors py-1 text-stone-800 cursor-pointer"
                >
                  Bracelets
                </button>
              </li>

              {/* 3. Rings */}
              <li className="py-3">
                <button
                  onClick={() => handleCategoryClick("rings")}
                  className="hover:text-[#9E7B35] transition-colors py-1 text-stone-800 cursor-pointer"
                >
                  Rings
                </button>
              </li>

              {/* 4. Earrings */}
              <li className="py-3">
                <button
                  onClick={() => handleCategoryClick("earrings")}
                  className="hover:text-[#9E7B35] transition-colors py-1 text-stone-800 cursor-pointer"
                >
                  Earrings
                </button>
              </li>

              {/* 5. Gold Chains */}
              <li className="py-3">
                <button
                  onClick={() => handleCategoryClick("chains")}
                  className="hover:text-[#9E7B35] transition-colors py-1 text-stone-800 cursor-pointer"
                >
                  Gold Chains
                </button>
              </li>

              {/* 6. Gold Exchange */}
              <li className="py-3">
                <button
                  onClick={() => router.push("/exchange-buyback-policy")}
                  className="text-[#9E7B35] hover:text-[#093B2A] font-bold transition-colors py-1 cursor-pointer flex items-center space-x-1"
                >
                  <span>⚡ 5-Min Gold Cash</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileSearchExpanded(!isMobileSearchExpanded)}
              className="md:hidden p-2 text-stone-800 hover:text-[#C5A059] transition-colors cursor-pointer"
              aria-label="Toggle Mobile Search"
              title="Search Jewellery"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => router.push("/products")}
              className="relative p-2 text-stone-800 hover:text-[#C5A059] transition-colors cursor-pointer"
              aria-label="View Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#9E7B35] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Enquiry Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-800 hover:text-[#C5A059] transition-colors cursor-pointer"
              aria-label="View Enquiry Bag"
              title="View Enquiry Bag"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8F6D2C] text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle (Right side on mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-800 hover:text-[#C5A059] transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {isMobileSearchExpanded && (
          <div className="md:hidden bg-white border-t border-[#E8DFC8] px-4 py-3 shadow-md animate-fade-in">
        <form onSubmit={handleNavSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            autoFocus
            value={navSearch}
            onChange={(e) => {
              setNavSearch(e.target.value);
              setIsSearchOpen(true);
            }}
            placeholder="Search jewellery, 22K, diamonds..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#FAF9F5] border border-[#DEC9A2] text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-[#C5A059]"
          />
          <Search className="w-4 h-4 text-[#8F6D2C] absolute left-3 pointer-events-none" />
          {navSearch && (
            <button
              type="button"
              onClick={() => setNavSearch("")}
              className="absolute right-3 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Mobile search live suggestions */}
        {navSearch.trim().length > 0 && (
          <div className="mt-2 divide-y divide-stone-100 max-h-60 overflow-y-auto">
            {searchResults.length > 0 ? (
              <>
                {searchResults.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsMobileSearchExpanded(false);
                      setNavSearch("");
                      router.push(`/products/${p.id}`);
                    }}
                    className="py-2 flex items-center space-x-3 cursor-pointer"
                  >
                    <img
                      src={p.images[0]}
                      alt=""
                      className="w-9 h-9 object-contain rounded bg-[#FBF9F6]"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-semibold text-stone-900 truncate">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-stone-500">₹{p.price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleNavSearchSubmit()}
                  className="w-full mt-2 py-1.5 bg-[#FAF3E0] text-[#7A5B1F] text-xs font-bold rounded-lg text-center cursor-pointer"
                >
                  View all {searchResults.length} results →
                </button>
              </>
            ) : (
              <p className="py-3 text-center text-xs text-stone-500">
                No matching jewellery found.
              </p>
            )}
          </div>
        )}
      </div>
    )}
  </header>

  {/* 4. MOBILE SLIDE-IN RIGHT SIDEBAR MENU (Mounted outside header to guarantee supreme z-index above all hero banners and sections) */}
  <div
    className={`lg:hidden fixed inset-0 transition-opacity duration-300 ease-in-out ${
      isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    }`}
    style={{ zIndex: 99999 }}
    aria-hidden={!isMobileMenuOpen}
  >
    {/* Backdrop (Click outside to close) */}
    <div
      onClick={() => setIsMobileMenuOpen(false)}
      className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300"
      style={{ zIndex: 99999 }}
    />

    {/* Slide-in Drawer Container (Right side smooth slide) */}
    <div
      className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out border-l border-[#E8DFC8] ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ zIndex: 100000 }}
      onClick={(e) => e.stopPropagation()}
>
  {/* Header */}
  <div className="p-4 border-b border-[#E8DFC8] bg-white flex items-center justify-between sticky top-0 z-10 shadow-2xs">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-sm shrink-0 bg-[#072016]">
        <img
          src="/logo.png"
          alt="Yashraj Jewellers"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-serif text-base font-bold text-[#1A130B] leading-tight">
          Yashraj Jewellers
        </h3>
        <p className="text-[10px] text-[#8F6D2C] tracking-widest uppercase font-semibold">
          Est. 1982 • Wholesale
        </p>
      </div>
    </div>

    <button
      onClick={() => setIsMobileMenuOpen(false)}
      className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 hover:bg-[#FAF3E0] hover:text-[#8F6D2C] flex items-center justify-center transition-colors"
      aria-label="Close Navigation Menu"
    >
      <X className="w-4 h-4" />
    </button>
  </div>

  {/* Search Inside Mobile Drawer */}
  <div className="p-3 bg-white border-b border-[#E8DFC8]">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (navSearch.trim()) {
          setIsMobileMenuOpen(false);
          router.push(`/products?search=${encodeURIComponent(navSearch.trim())}`);
          setNavSearch("");
        }
      }}
      className="relative flex items-center"
    >
      <input
        type="text"
        value={navSearch}
        onChange={(e) => setNavSearch(e.target.value)}
        placeholder="Search jewellery catalogue..."
        className="w-full pl-8 pr-7 py-2 rounded-xl bg-[#FAF9F5] border border-[#DEC9A2] text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-[#C5A059]"
      />
      <Search className="w-3.5 h-3.5 text-[#8F6D2C] absolute left-2.5 pointer-events-none" />
      {navSearch && (
        <button
          type="button"
          onClick={() => setNavSearch("")}
          className="absolute right-2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  </div>

  {/* Navigation Links with Expandable Accordions */}
  <div className="p-4 flex-1 space-y-2">
    {/* 1. Category Quick Links */}
    <div className="border-b border-[#E8DFC8]/60 pb-3 space-y-1">
      <button
        onClick={() => handleCategoryClick("all")}
        className="block w-full text-left py-2 px-3 rounded-lg font-bold text-[#8F6D2C] hover:bg-[#FAF3E0] transition-colors"
      >
        All Jewellery →
      </button>
      <button
        onClick={() => handleCategoryClick("bracelets")}
        className="block w-full text-left py-2 px-3 rounded-lg font-medium text-stone-800 hover:text-[#8F6D2C] hover:bg-[#FAF3E0] transition-colors"
      >
        Bracelets
      </button>
      <button
        onClick={() => handleCategoryClick("rings")}
        className="block w-full text-left py-2 px-3 rounded-lg font-medium text-stone-800 hover:text-[#8F6D2C] hover:bg-[#FAF3E0] transition-colors"
      >
        Rings
      </button>
      <button
        onClick={() => handleCategoryClick("earrings")}
        className="block w-full text-left py-2 px-3 rounded-lg font-medium text-stone-800 hover:text-[#8F6D2C] hover:bg-[#FAF3E0] transition-colors"
      >
        Earrings
      </button>
      <button
        onClick={() => handleCategoryClick("chains")}
        className="block w-full text-left py-2 px-3 rounded-lg font-medium text-stone-800 hover:text-[#8F6D2C] hover:bg-[#FAF3E0] transition-colors"
      >
        Gold Chains
      </button>
      <button
        onClick={() => {
          router.push("/exchange-buyback-policy");
          setIsMobileMenuOpen(false);
        }}
        className="block w-full text-left py-2.5 px-3 rounded-lg font-bold text-[#DFBA73] bg-[#093B2A] mt-2 shadow-sm"
      >
        ⚡ 5-Minute Instant Gold Cash
      </button>
    </div>
  </div>

  {/* Footer CTAs */}
  <div className="p-4 border-t border-[#E8DFC8] bg-white space-y-2 sticky bottom-0 z-10">
    <button
      onClick={() => {
        setIsMobileMenuOpen(false);
        const text = encodeURIComponent(
          "Namaste Yashraj Jewellery! I am a jewellery retailer/reseller and would like to enquire about your wholesale collections and trade pricing."
        );
        window.open(`https://wa.me/917008343796?text=${text}`, "_blank");
      }}
      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-stone-900 font-bold text-xs uppercase tracking-wider text-center shadow-md hover:shadow-lg transition-transform"
    >
      Wholesale Trade Enquiry
    </button>
    <button
      onClick={() => {
        setIsMobileMenuOpen(false);
        setIsVideoCallOpen(true);
      }}
      className="w-full py-2 rounded-xl border border-[#C5A059] text-[#7A5B1F] bg-[#FAF3E0] font-semibold text-xs uppercase tracking-wider text-center transition"
    >
      Live Video Shopping Call
    </button>
  </div>
</div>
      </div>
    </>
  );
}
