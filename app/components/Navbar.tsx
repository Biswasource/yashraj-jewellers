"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { CATEGORIES } from "../data/products";
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
} from "lucide-react";

export default function Navbar() {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAppointmentOpen,
    setIsVideoCallOpen,
    setSelectedCategory,
    setSelectedMetal,
    setSelectedOccasion,
    scrollToProducts,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
    scrollToProducts();
  };

  const handleMetalClick = (metal: string) => {
    setSelectedMetal(metal);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    scrollToProducts();
  };

  const handleOccasionClick = (occ: string) => {
    setSelectedOccasion(occ);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    scrollToProducts();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* 2. MAIN BRAND HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left Side: LOGO (Left Aligned with Round Emblem) */}
        <a href="#" className="flex items-center space-x-2.5 sm:space-x-3.5 group text-left">
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden shadow-md border-2 border-[#C5A059]/60 group-hover:scale-105 transition-all duration-300 shrink-0 bg-[#072016]">
            <img
              src="/logo.png"
              alt="Yashraj Jewellers"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-serif tracking-[0.2em] uppercase font-bold text-[#1A130B] group-hover:text-[#9E7B35] transition-colors leading-tight">
              Yashraj
            </h1>
            <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.28em] text-[#8F6D2C] uppercase font-semibold">
              Jewellers • Est. 1982
            </p>
          </div>
        </a>

        {/* Right Side: ACTIONS (Wholesale Enquiry, Wishlist, Enquiry Bag, and Mobile Menu Toggle) */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Wholesale Trade Partner CTA */}
          <button
            onClick={() => {
              const el = document.getElementById("wholesale-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border border-[#C5A059] text-[#7A5B1F] bg-[#FAF3E0] hover:bg-[#C5A059] hover:text-white transition shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Wholesale Enquiry</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-stone-800 hover:text-[#C5A059] transition-colors"
            aria-label="View Wishlist"
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
            className="relative p-2 text-stone-800 hover:text-[#C5A059] transition-colors"
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
            className="lg:hidden p-2 text-stone-800 hover:text-[#C5A059] transition-colors focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. DESKTOP NAVIGATION BAR (Exact Match to User Reference) */}
      <nav className="hidden lg:block border-t border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center space-x-7 sm:space-x-8 text-[13px] font-medium text-stone-700">
            {/* 1. All Jewellery ∨ */}
            <li
              className="relative group py-3 cursor-pointer"
              onMouseEnter={() => setActiveDropdown("all")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleCategoryClick("all")}
                className="flex items-center space-x-1.5 hover:text-[#9E7B35] transition-colors py-1 text-stone-800"
              >
                <span>All Jewellery</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#9E7B35] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {/* Mega Dropdown */}
              {activeDropdown === "all" && (
                <div className="absolute left-0 top-full w-[820px] bg-white border border-[#E8DFC8] shadow-2xl rounded-b-xl p-6 grid grid-cols-4 gap-6 animate-fade-in z-50 text-stone-700">
                  {/* Col 1: Categories */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] pb-2 mb-3">
                      By Category
                    </h4>
                    <ul className="space-y-2 text-xs normal-case tracking-normal">
                      {CATEGORIES.slice(1).map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => handleCategoryClick(cat.id)}
                            className="hover:text-[#9E7B35] hover:translate-x-1 transition-all text-left block w-full"
                          >
                            {cat.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 2: By Price */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] pb-2 mb-3">
                      By Price
                    </h4>
                    <ul className="space-y-2 text-xs normal-case tracking-normal">
                      <li>
                        <button
                          onClick={() => handleCategoryClick("all")}
                          className="hover:text-[#9E7B35] transition-colors block text-left"
                        >
                          Under ₹25,000
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleCategoryClick("all")}
                          className="hover:text-[#9E7B35] transition-colors block text-left"
                        >
                          ₹25,000 - ₹50,000
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleCategoryClick("all")}
                          className="hover:text-[#9E7B35] transition-colors block text-left"
                        >
                          ₹50,000 - ₹1,00,000
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleCategoryClick("all")}
                          className="hover:text-[#9E7B35] transition-colors block text-left"
                        >
                          ₹1,00,000 - ₹2,00,000
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleCategoryClick("all")}
                          className="hover:text-[#9E7B35] transition-colors block text-left font-semibold text-[#8F6D2C]"
                        >
                          Above ₹2,00,000 (Royal Heritage)
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Col 3: By Gender & Occasion */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] pb-2 mb-3">
                      By Occasion & Gender
                    </h4>
                    <ul className="space-y-2 text-xs normal-case tracking-normal">
                      <li>
                        <button
                          onClick={() => handleOccasionClick("wedding")}
                          className="hover:text-[#9E7B35] transition-colors block text-left font-medium"
                        >
                          Vivaha & Bridal Special
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleOccasionClick("festive")}
                          className="hover:text-[#9E7B35] transition-colors block text-left"
                        >
                          Festive & Puja Ornaments
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleOccasionClick("daily-wear")}
                          className="hover:text-[#9E7B35] transition-colors block text-left"
                        >
                          Daily Wear Lightweight
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleOccasionClick("light-occasion")}
                          className="hover:text-[#9E7B35] transition-colors block text-left"
                        >
                          Office & Cocktail Parties
                        </button>
                      </li>
                      <li className="pt-2 border-t border-stone-100 font-semibold text-stone-900">
                        Women • Men • Kids
                      </li>
                    </ul>
                  </div>

                  {/* Col 4: Featured Banner */}
                  <div className="bg-[#FAF3E0] p-4 rounded-lg border border-[#E6D4B0] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#8F6D2C]">
                        Spotlight
                      </span>
                      <h5 className="font-serif text-sm font-bold text-stone-900 mt-1 mb-2">
                        Odisha Tarakasi & Antique Chokers
                      </h5>
                      <p className="text-[11px] text-stone-600 normal-case leading-relaxed">
                        Handcrafted filigree wire artistry with BIS 916 purity stamp.
                      </p>
                    </div>
                    <button
                      onClick={() => handleCategoryClick("necklaces")}
                      className="mt-3 text-[11px] font-bold text-[#8F6D2C] underline uppercase tracking-wider text-left"
                    >
                      Explore Collection →
                    </button>
                  </div>
                </div>
              )}
            </li>

            {/* 2. Gold ∨ */}
            <li
              className="relative group py-3 cursor-pointer"
              onMouseEnter={() => setActiveDropdown("gold")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleMetalClick("gold")}
                className="flex items-center space-x-1.5 hover:text-[#9E7B35] transition-colors py-1 text-stone-800"
              >
                <span>Gold</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#9E7B35] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {activeDropdown === "gold" && (
                <div className="absolute left-0 top-full w-64 bg-white border border-[#E8DFC8] shadow-2xl rounded-b-xl py-3 px-2 z-50 animate-fade-in text-stone-700">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] mb-1">
                    22K & 24K Gold
                  </div>
                  <ul className="text-xs space-y-1">
                    {[
                      { label: "22K Gold Necklaces & Harams", action: () => handleCategoryClick("necklaces") },
                      { label: "22K Royal Bangles & Kadas", action: () => handleCategoryClick("bangles") },
                      { label: "22K Jhumkas & Earrings", action: () => handleCategoryClick("earrings") },
                      { label: "Daily Wear Gold Chains", action: () => handleCategoryClick("necklaces") },
                      { label: "Mangalsutra & Tanmaniya", action: () => handleCategoryClick("mangalsutras") },
                      { label: "Antique Temple Jewellery", action: () => handleMetalClick("gold") },
                      { label: "24K Pure Gold Coins (999 Purity)", action: () => handleCategoryClick("coins") },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded hover:bg-[#FAF3E0] hover:text-[#8F6D2C] transition-colors"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* 3. Diamond ∨ */}
            <li
              className="relative group py-3 cursor-pointer"
              onMouseEnter={() => setActiveDropdown("diamond")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleMetalClick("diamond")}
                className="flex items-center space-x-1.5 hover:text-[#9E7B35] transition-colors py-1 text-stone-800"
              >
                <span>Diamond</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#9E7B35] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {activeDropdown === "diamond" && (
                <div className="absolute left-0 top-full w-64 bg-white border border-[#E8DFC8] shadow-2xl rounded-b-xl py-3 px-2 z-50 animate-fade-in text-stone-700">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] mb-1">
                    Natural Solitaires
                  </div>
                  <ul className="text-xs space-y-1">
                    {[
                      { label: "Solitaire Engagement Rings", action: () => handleCategoryClick("rings") },
                      { label: "Diamond Chokers & Necklaces", action: () => handleCategoryClick("necklaces") },
                      { label: "Solitaire Studs & Tops", action: () => handleCategoryClick("earrings") },
                      { label: "Diamond Daily Wear Bands", action: () => handleCategoryClick("rings") },
                      { label: "VVS-EF Natural Solitaires", action: () => handleMetalClick("diamond") },
                      { label: "Bridal Diamond Sets", action: () => handleOccasionClick("wedding") },
                      { label: "IGI Certified Solitaires", action: () => handleMetalClick("diamond") },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded hover:bg-[#FAF3E0] hover:text-[#8F6D2C] transition-colors"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* 4. Silver ∨ */}
            <li
              className="relative group py-3 cursor-pointer"
              onMouseEnter={() => setActiveDropdown("silver")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleMetalClick("silver")}
                className="flex items-center space-x-1.5 hover:text-[#9E7B35] transition-colors py-1 text-stone-800"
              >
                <span>Silver</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#9E7B35] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {activeDropdown === "silver" && (
                <div className="absolute left-0 top-full w-64 bg-white border border-[#E8DFC8] shadow-2xl rounded-b-xl py-3 px-2 z-50 animate-fade-in text-stone-700">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] mb-1">
                    Odisha Silver & Filigree
                  </div>
                  <ul className="text-xs space-y-1">
                    {[
                      { label: "Cuttack Tarakasi Silver Filigree", action: () => handleCategoryClick("silver-filigree") },
                      { label: "Silver Payal & Anklets", action: () => handleMetalClick("silver") },
                      { label: "Pure Silver Utensils & Thalis", action: () => handleMetalClick("silver") },
                      { label: "Silver Puja Idols & Diyas", action: () => handleMetalClick("silver") },
                      { label: "925 Sterling Silver Jewellery", action: () => handleMetalClick("silver") },
                      { label: "Silver Bullion Coins (999 Purity)", action: () => handleCategoryClick("coins") },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded hover:bg-[#FAF3E0] hover:text-[#8F6D2C] transition-colors"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* 5. Gifting ∨ */}
            <li
              className="relative group py-3 cursor-pointer"
              onMouseEnter={() => setActiveDropdown("gifting")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleOccasionClick("festive")}
                className="flex items-center space-x-1.5 hover:text-[#9E7B35] transition-colors py-1 text-stone-800"
              >
                <span>Gifting</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#9E7B35] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {activeDropdown === "gifting" && (
                <div className="absolute left-0 top-full w-64 bg-white border border-[#E8DFC8] shadow-2xl rounded-b-xl py-3 px-2 z-50 animate-fade-in text-stone-700">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] mb-1">
                    Precious Gifts & Keepsakes
                  </div>
                  <ul className="text-xs space-y-1">
                    {[
                      { label: "Wedding & Vivaha Gifts", action: () => handleOccasionClick("wedding") },
                      { label: "Anniversary Keepsakes", action: () => handleCategoryClick("rings") },
                      { label: "Birthday & Milestones", action: () => handleCategoryClick("earrings") },
                      { label: "Gifts Under ₹10,000", action: () => handleCategoryClick("all") },
                      { label: "Gifts ₹10,000 - ₹25,000", action: () => handleCategoryClick("all") },
                      { label: "Gold & Silver Gift Coins", action: () => handleCategoryClick("coins") },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            item.action();
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded hover:bg-[#FAF3E0] hover:text-[#8F6D2C] transition-colors"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* 6. More ∨ */}
            <li
              className="relative group py-3 cursor-pointer"
              onMouseEnter={() => setActiveDropdown("more")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => {
                  const el = document.getElementById("promises-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-1.5 hover:text-[#9E7B35] transition-colors py-1 text-stone-800"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#9E7B35] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {activeDropdown === "more" && (
                <div className="absolute left-0 top-full w-72 bg-white border border-[#E8DFC8] shadow-2xl rounded-b-xl py-3 px-2 z-50 animate-fade-in text-stone-700">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] mb-1">
                    Discover Yashraj
                  </div>
                  <ul className="text-xs space-y-1">
                    {[
                      {
                        label: "Wholesale & Retailer Partnership",
                        action: () => {
                          setActiveDropdown(null);
                          document.getElementById("wholesale-section")?.scrollIntoView({ behavior: "smooth" });
                        },
                      },
                      {
                        label: "The Yashraj Promises (BIS 916 Hallmark)",
                        action: () => {
                          setActiveDropdown(null);
                          document.getElementById("promises-section")?.scrollIntoView({ behavior: "smooth" });
                        },
                      },
                      {
                        label: "Swarna Sanchay Gold Savings Scheme",
                        action: () => {
                          setActiveDropdown(null);
                          document.getElementById("scheme-section")?.scrollIntoView({ behavior: "smooth" });
                        },
                      },
                      {
                        label: "Showrooms (Bhubaneswar, Cuttack, Delhi)",
                        action: () => {
                          setActiveDropdown(null);
                          document.getElementById("showrooms-section")?.scrollIntoView({ behavior: "smooth" });
                        },
                      },
                      {
                        label: "Voices of Trust & Delight (Reviews)",
                        action: () => {
                          setActiveDropdown(null);
                          document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" });
                        },
                      },
                      {
                        label: "Book Showroom Visit",
                        action: () => {
                          setActiveDropdown(null);
                          setIsAppointmentOpen(true);
                        },
                      },
                      {
                        label: "Live Video Shopping Call",
                        action: () => {
                          setActiveDropdown(null);
                          setIsVideoCallOpen(true);
                        },
                      },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={item.action}
                          className="w-full text-left px-3 py-1.5 rounded hover:bg-[#FAF3E0] hover:text-[#8F6D2C] transition-colors"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* 7. Pay OnLine ∨ */}
            <li
              className="relative group py-3 cursor-pointer"
              onMouseEnter={() => setActiveDropdown("payonline")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => {
                  const el = document.getElementById("scheme-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-1.5 hover:text-[#9E7B35] transition-colors py-1 text-[#8F6D2C] font-semibold"
              >
                <span>Pay OnLine</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8F6D2C] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {activeDropdown === "payonline" && (
                <div className="absolute right-0 top-full w-72 bg-white border border-[#E8DFC8] shadow-2xl rounded-b-xl py-3 px-2 z-50 animate-fade-in text-stone-700">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9E7B35] border-b border-[#F0E6D2] mb-1">
                    Quick Online Payments
                  </div>
                  <ul className="text-xs space-y-1">
                    {[
                      {
                        label: "Pay Monthly Scheme (Swarna Sanchay)",
                        action: () => {
                          setActiveDropdown(null);
                          document.getElementById("scheme-section")?.scrollIntoView({ behavior: "smooth" });
                        },
                      },
                      {
                        label: "Advance Booking Deposit",
                        action: () => {
                          setActiveDropdown(null);
                          setIsAppointmentOpen(true);
                        },
                      },
                      {
                        label: "Custom Jewellery Order Advance",
                        action: () => {
                          setActiveDropdown(null);
                          setIsAppointmentOpen(true);
                        },
                      },
                      {
                        label: "Request Instant UPI Payment Link",
                        action: () => {
                          setActiveDropdown(null);
                          const text = encodeURIComponent(
                            "Namaste Yashraj Jewellers! I would like to make an online payment. Please share your official UPI payment link or QR code."
                          );
                          window.open(`https://wa.me/918917652306?text=${text}`, "_blank");
                        },
                      },
                    ].map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={item.action}
                          className="w-full text-left px-3 py-1.5 rounded hover:bg-[#FAF3E0] hover:text-[#8F6D2C] transition-colors"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
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

          {/* Navigation Links with Expandable Accordions */}
          <div className="p-4 flex-1 space-y-1">
            {/* 1. All Jewellery */}
            <div className="border-b border-[#E8DFC8]/60 pb-1.5">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "all" ? null : "all")}
                className="flex items-center justify-between w-full py-2.5 text-left font-medium text-stone-800 hover:text-[#8F6D2C]"
              >
                <span className="text-sm">All Jewellery</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    mobileExpanded === "all" ? "rotate-180 text-[#8F6D2C]" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "all" && (
                <div className="pl-3 pr-1 py-1 space-y-2 text-xs text-stone-600 bg-white rounded-lg p-2.5 mb-2 border border-stone-200/60">
                  <button
                    onClick={() => handleCategoryClick("all")}
                    className="block w-full text-left py-1 font-semibold text-[#8F6D2C]"
                  >
                    View All Collections →
                  </button>
                  {CATEGORIES.slice(1).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Gold */}
            <div className="border-b border-[#E8DFC8]/60 pb-1.5">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "gold" ? null : "gold")}
                className="flex items-center justify-between w-full py-2.5 text-left font-medium text-stone-800 hover:text-[#8F6D2C]"
              >
                <span className="text-sm">Gold (22K / 24K)</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    mobileExpanded === "gold" ? "rotate-180 text-[#8F6D2C]" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "gold" && (
                <div className="pl-3 pr-1 py-1 space-y-2 text-xs text-stone-600 bg-white rounded-lg p-2.5 mb-2 border border-stone-200/60">
                  {[
                    { label: "22K Gold Necklaces & Harams", action: () => handleCategoryClick("necklaces") },
                    { label: "22K Royal Bangles & Kadas", action: () => handleCategoryClick("bangles") },
                    { label: "22K Jhumkas & Earrings", action: () => handleCategoryClick("earrings") },
                    { label: "Daily Wear Gold Chains", action: () => handleCategoryClick("necklaces") },
                    { label: "Mangalsutra & Tanmaniya", action: () => handleCategoryClick("mangalsutras") },
                    { label: "24K Pure Gold Coins (999 Purity)", action: () => handleCategoryClick("coins") },
                  ].map((sub, i) => (
                    <button
                      key={i}
                      onClick={sub.action}
                      className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Diamond */}
            <div className="border-b border-[#E8DFC8]/60 pb-1.5">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "diamond" ? null : "diamond")}
                className="flex items-center justify-between w-full py-2.5 text-left font-medium text-stone-800 hover:text-[#8F6D2C]"
              >
                <span className="text-sm">Diamond Solitaires</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    mobileExpanded === "diamond" ? "rotate-180 text-[#8F6D2C]" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "diamond" && (
                <div className="pl-3 pr-1 py-1 space-y-2 text-xs text-stone-600 bg-white rounded-lg p-2.5 mb-2 border border-stone-200/60">
                  {[
                    { label: "Solitaire Engagement Rings", action: () => handleCategoryClick("rings") },
                    { label: "Diamond Chokers & Necklaces", action: () => handleCategoryClick("necklaces") },
                    { label: "Solitaire Studs & Tops", action: () => handleCategoryClick("earrings") },
                    { label: "VVS-EF Certified Solitaires", action: () => handleMetalClick("diamond") },
                    { label: "Bridal Diamond Sets", action: () => handleOccasionClick("wedding") },
                  ].map((sub, i) => (
                    <button
                      key={i}
                      onClick={sub.action}
                      className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Silver */}
            <div className="border-b border-[#E8DFC8]/60 pb-1.5">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "silver" ? null : "silver")}
                className="flex items-center justify-between w-full py-2.5 text-left font-medium text-stone-800 hover:text-[#8F6D2C]"
              >
                <span className="text-sm">Silver & Filigree</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    mobileExpanded === "silver" ? "rotate-180 text-[#8F6D2C]" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "silver" && (
                <div className="pl-3 pr-1 py-1 space-y-2 text-xs text-stone-600 bg-white rounded-lg p-2.5 mb-2 border border-stone-200/60">
                  {[
                    { label: "Cuttack Tarakasi Silver Filigree", action: () => handleCategoryClick("silver-filigree") },
                    { label: "Silver Payal & Anklets", action: () => handleMetalClick("silver") },
                    { label: "Pure Silver Utensils & Thalis", action: () => handleMetalClick("silver") },
                    { label: "Silver Puja Idols & Diyas", action: () => handleMetalClick("silver") },
                    { label: "Silver Coins (999 Purity)", action: () => handleCategoryClick("coins") },
                  ].map((sub, i) => (
                    <button
                      key={i}
                      onClick={sub.action}
                      className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Gifting */}
            <div className="border-b border-[#E8DFC8]/60 pb-1.5">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "gifting" ? null : "gifting")}
                className="flex items-center justify-between w-full py-2.5 text-left font-medium text-stone-800 hover:text-[#8F6D2C]"
              >
                <span className="text-sm">Gifting</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    mobileExpanded === "gifting" ? "rotate-180 text-[#8F6D2C]" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "gifting" && (
                <div className="pl-3 pr-1 py-1 space-y-2 text-xs text-stone-600 bg-white rounded-lg p-2.5 mb-2 border border-stone-200/60">
                  {[
                    { label: "Wedding & Vivaha Gifts", action: () => handleOccasionClick("wedding") },
                    { label: "Anniversary Keepsakes", action: () => handleCategoryClick("rings") },
                    { label: "Birthday & Milestones", action: () => handleCategoryClick("earrings") },
                    { label: "Gold & Silver Gift Coins", action: () => handleCategoryClick("coins") },
                  ].map((sub, i) => (
                    <button
                      key={i}
                      onClick={sub.action}
                      className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 6. More */}
            <div className="border-b border-[#E8DFC8]/60 pb-1.5">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "more" ? null : "more")}
                className="flex items-center justify-between w-full py-2.5 text-left font-medium text-stone-800 hover:text-[#8F6D2C]"
              >
                <span className="text-sm">More</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                    mobileExpanded === "more" ? "rotate-180 text-[#8F6D2C]" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "more" && (
                <div className="pl-3 pr-1 py-1 space-y-2 text-xs text-stone-600 bg-white rounded-lg p-2.5 mb-2 border border-stone-200/60">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById("wholesale-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block w-full text-left py-1 font-semibold text-[#8F6D2C]"
                  >
                    Wholesale & Retailer Partnership
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById("promises-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                  >
                    The Yashraj Promises (BIS 916)
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById("scheme-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                  >
                    Swarna Sanchay Gold Scheme
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                  >
                    Voices of Trust (Reviews)
                  </button>
                </div>
              )}
            </div>

            {/* 7. Pay OnLine */}
            <div className="border-b border-[#E8DFC8]/60 pb-1.5">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === "payonline" ? null : "payonline")}
                className="flex items-center justify-between w-full py-2.5 text-left font-semibold text-[#8F6D2C]"
              >
                <span className="text-sm">Pay OnLine</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8F6D2C] transition-transform duration-200 ${
                    mobileExpanded === "payonline" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "payonline" && (
                <div className="pl-3 pr-1 py-1 space-y-2 text-xs text-stone-600 bg-white rounded-lg p-2.5 mb-2 border border-stone-200/60">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document.getElementById("scheme-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block w-full text-left py-1 font-semibold text-[#8F6D2C]"
                  >
                    Pay Monthly Gold Scheme
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAppointmentOpen(true);
                    }}
                    className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                  >
                    Advance Booking Deposit
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      const text = encodeURIComponent(
                        "Namaste Yashraj Jewellers! I would like to make an online payment. Please share your official UPI QR code or payment link."
                      );
                      window.open(`https://wa.me/918917652306?text=${text}`, "_blank");
                    }}
                    className="block w-full text-left py-1 hover:text-[#8F6D2C]"
                  >
                    Request Instant UPI Link
                  </button>
                </div>
              )}
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
                window.open(`https://wa.me/918917652306?text=${text}`, "_blank");
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-stone-900 font-bold text-xs uppercase tracking-wider text-center shadow-md hover:shadow-lg transition-transform"
            >
              Wholesale Trade Enquiry
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAppointmentOpen(true);
              }}
              className="w-full py-2 rounded-xl border border-[#C5A059] text-[#7A5B1F] bg-[#FAF3E0] font-semibold text-xs uppercase tracking-wider text-center transition"
            >
              Book Showroom Visit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
