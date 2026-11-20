"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, getRelatedProducts, LIVE_RATES } from "../../data/products";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../../components/ProductCard";
import ProductPageLoader from "../../components/ProductPageLoader";
import {
  Heart,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronLeft,
  Send,
  MessageCircle,
  ShieldCheck,
  Info,
  Sparkles,
  PhoneCall,
  Clock,
  ArrowRight,
  X,
  FileText,
  Truck,
  RotateCcw,
  Gem,
} from "lucide-react";

interface ProductDetailClientProps {
  product?: Product;
  productId?: string;
}

export default function ProductDetailClient({
  product: initialProduct,
  productId,
}: ProductDetailClientProps) {
  const {
    products,
    getProduct,
    addToWishlist,
    isInWishlist,
    setEnquireProduct,
    showToast,
    isLoadingProducts,
  } = useStore();

  const lookupId = productId || initialProduct?.id;
  const product = (lookupId ? getProduct(lookupId) : undefined) || initialProduct;

  const [mounted, setMounted] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    // Keep smooth loading screen visible while hydrating and until product is resolved or store finishes loading
    if (mounted && (product || !isLoadingProducts)) {
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
        const hideTimer = setTimeout(() => {
          setIsPageLoading(false);
        }, 320);
        return () => clearTimeout(hideTimer);
      }, 650);

      return () => clearTimeout(fadeTimer);
    }
  }, [mounted, product, isLoadingProducts]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [mouseDownX, setMouseDownX] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openPolicyModal, setOpenPolicyModal] = useState<"why" | "policy" | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Accordion state matching Lalchnd
  const [accordionState, setAccordionState] = useState<{
    description: boolean;
    specification: boolean;
    metals: boolean;
  }>({
    description: true,
    specification: true,
    metals: true,
  });

  const toggleAccordion = (key: "description" | "specification" | "metals") => {
    setAccordionState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!product) {
    if (isPageLoading || isLoadingProducts || !mounted) {
      return <ProductPageLoader isFading={isFading} message="Loading Jewellery Piece..." />;
    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF3E0] border border-[#DEC9A2] flex items-center justify-center text-[#8F6D2C]">
          <Gem className="w-10 h-10" />
        </div>
        <h1 className="font-serif font-bold text-3xl text-stone-900">
          Jewellery Piece Not Found
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          The creation you are looking for is currently unavailable in the showroom catalogue or may have been custom crafted.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-950 font-bold text-xs uppercase tracking-wider shadow hover:brightness-105 transition flex items-center space-x-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Browse Full Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  const isWish = isInWishlist(product.id);
  const related = getRelatedProducts(product, 4, products);

  // Safe gallery images array with fallback
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : ["https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80"];

  // Touch Swipe & Finger Scroll State Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (galleryImages.length <= 1) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setDragOffset(0);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || touchStartY === null || !isSwiping) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX;
    const diffY = currentY - touchStartY;

    // Only drag horizontally if horizontal movement exceeds vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      const isAtStart = activeImgIndex === 0 && diffX > 0;
      const isAtEnd = activeImgIndex === galleryImages.length - 1 && diffX < 0;
      const resistance = isAtStart || isAtEnd ? 0.3 : 1;
      setDragOffset(diffX * resistance);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    const threshold = 40; // 40px swipe trigger
    if (dragOffset < -threshold && activeImgIndex < galleryImages.length - 1) {
      setActiveImgIndex((prev) => prev + 1);
    } else if (dragOffset > threshold && activeImgIndex > 0) {
      setActiveImgIndex((prev) => prev - 1);
    }
    setDragOffset(0);
    setTouchStartX(null);
    setTouchStartY(null);
    setIsSwiping(false);
  };

  // Mouse drag support for desktop testing
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (galleryImages.length <= 1) return;
    setMouseDownX(e.clientX);
    setDragOffset(0);
    setIsSwiping(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownX === null || !isSwiping) return;
    const diffX = e.clientX - mouseDownX;
    const isAtStart = activeImgIndex === 0 && diffX > 0;
    const isAtEnd = activeImgIndex === galleryImages.length - 1 && diffX < 0;
    const resistance = isAtStart || isAtEnd ? 0.3 : 1;
    setDragOffset(diffX * resistance);
  };

  const handleMouseUp = () => {
    if (!isSwiping) return;
    const threshold = 40;
    if (dragOffset < -threshold && activeImgIndex < galleryImages.length - 1) {
      setActiveImgIndex((prev) => prev + 1);
    } else if (dragOffset > threshold && activeImgIndex > 0) {
      setActiveImgIndex((prev) => prev - 1);
    }
    setDragOffset(0);
    setMouseDownX(null);
    setIsSwiping(false);
  };

  // Formatted price with 2 decimals
  const formattedPrice = product.price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(product.code);
      setCopiedCode(true);
      showToast("Product code copied!");
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      showToast("Product code: " + product.code);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast("Product link copied!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      showToast("Link copied to clipboard!");
    }
  };

  const handleScrollToInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("additional-information");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-screen relative">
      {isPageLoading && <ProductPageLoader isFading={isFading} message="Loading Jewellery Piece..." />}
      {/* 1. TOP MAIN PRODUCT SECTION (COMPACT LALCHND LAYOUT) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* LEFT: GALLERY WITH TOUCH FINGER SWIPE & SLIDE ANIMATION (COMPACT 5 COLUMNS) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="sticky top-24 space-y-3">
              {/* Main Stage Image Slider Container with Finger Touch/Swipe */}
              <div
                className="relative aspect-square w-full max-w-[340px] sm:max-w-[360px] mx-auto overflow-hidden flex items-center justify-center group select-none touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Smooth Animated Sliding Track */}
                <div
                  className="flex w-full h-full cursor-grab active:cursor-grabbing"
                  style={{
                    transform: `translateX(calc(-${activeImgIndex * 100}% + ${dragOffset}px))`,
                    transition: isSwiping ? "none" : "transform 350ms cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="w-full h-full shrink-0 flex items-center justify-center p-1"
                    >
                      <img
                        src={img}
                        alt={`${product.name} - View ${idx + 1}`}
                        draggable={false}
                        className="w-full h-full object-contain pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                {/* Left Floating Arrow Button */}
                {galleryImages.length > 1 && activeImgIndex > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIndex((prev) => Math.max(prev - 1, 0));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md border border-[#E8DFC8] flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                {/* Right Floating Arrow Button */}
                {galleryImages.length > 1 && activeImgIndex < galleryImages.length - 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIndex((prev) => Math.min(prev + 1, galleryImages.length - 1));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md border border-[#E8DFC8] flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {/* Swipe Slide Feedback Dots Indicator */}
                {galleryImages.length > 1 && (
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-xs pointer-events-none">
                    {galleryImages.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeImgIndex ? "w-5 bg-[#DFBA73]" : "w-1.5 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Wishlist Heart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToWishlist(product);
                  }}
                  className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isWish
                      ? "bg-white text-rose-600 shadow-sm scale-105"
                      : "bg-white/80 hover:bg-white text-stone-600 hover:text-rose-600 shadow-xs"
                  }`}
                  aria-label="Add to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWish ? "fill-rose-600 text-rose-600" : ""}`} />
                </button>
              </div>

              {/* Thumbnails Strip (Synced with active slide) */}
              {galleryImages.length > 1 && (
                <div className="flex items-center justify-center space-x-2.5 overflow-x-auto pb-1 scrollbar-thin">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`relative w-14 h-14 overflow-hidden shrink-0 rounded-lg transition-all cursor-pointer ${
                        activeImgIndex === idx
                          ? "ring-2 ring-[#C5A059] opacity-100 scale-105 shadow-xs"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & ACTIONS (7 COLUMNS - COMPACT FONTS & SPACING) */}
          <div className="lg:col-span-7 space-y-3 text-stone-900">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-1.5 text-[11px] text-stone-500 font-medium">
              <Link href="/" className="hover:text-stone-900 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:text-stone-900 transition-colors">
                Products
              </Link>
              <span>/</span>
              <span className="text-stone-900 font-normal truncate max-w-xs">{product.name}</span>
            </nav>

            {/* Rating Stars */}
            <div className="flex items-center space-x-1.5 pt-0.5">
              <div className="flex text-[#C9A227] space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" />
                ))}
              </div>
              <span className="text-[11px] text-stone-500 font-medium">
                (4.9/5 • {product.reviewsCount || 18} Reviews)
              </span>
            </div>

            {/* Title & Share Row */}
            <div className="flex items-start justify-between gap-3 pt-0.5 border-b border-[#F0EAE1] pb-2.5">
              <h1 className="font-serif text-lg sm:text-xl md:text-2xl text-stone-900 font-normal leading-snug">
                {product.name}
              </h1>

              {/* Share Button Trigger */}
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-[#FAF3E0] border border-[#DEC9A2] text-stone-700 hover:text-[#8F6D2C] transition-all cursor-pointer shadow-2xs group shrink-0"
                aria-label="Share this jewellery creation"
                title="Share on WhatsApp, Facebook, X, Instagram"
              >
                <Share2 className="w-3.5 h-3.5 text-[#8F6D2C] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">Share</span>
              </button>
            </div>

            {/* Product Code & In Stock Row */}
            <div className="flex items-center space-x-3 text-[11px]">
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-stone-500 font-semibold">{product.code}</span>
                <button
                  onClick={handleCopyCode}
                  className="text-stone-400 hover:text-stone-700 transition cursor-pointer p-0.5"
                  title="Copy product code"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <span className="text-stone-300">•</span>
              <div className="flex items-center space-x-1 text-[#198754] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>In Stock</span>
              </div>
            </div>

            {/* Product Description line */}
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              {product.description ||
                `Adorn yourself with the traditional charm of ${product.name}. Crafted in radiant 22K pure hallmarked gold with intricate hand-carved detailing.`}
            </p>

            {/* Purity, Color & Gross Weight Highlight */}
            <div className="pt-0.5">
              <p className="text-xs sm:text-[13px] font-semibold tracking-wide" style={{ color: "#e4562e" }}>
                {product.purity} Golden &nbsp;|&nbsp; {product.grossWeight} gm Gross wt.
              </p>
            </div>

            {/* Price Box */}
            <div className="pt-1.5 pb-0.5 space-y-0.5">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl sm:text-[28px] font-bold font-serif text-stone-900 tracking-tight">
                  ₹{formattedPrice}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 leading-snug">
                * Approximate (excluding taxes, GST and stone charges)
              </p>
              <p className="text-[10px] sm:text-[11px] text-stone-400 leading-snug">
                * Prices may vary with market fluctuations. Please visit our store for the latest pricing.
              </p>
            </div>

            {/* Action Buttons: View More + Enquire Now */}
            <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={handleScrollToInfo}
                className="flex-1 py-2.5 px-5 rounded-lg border border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 text-center cursor-pointer"
              >
                View More
              </button>
              <button
                onClick={() => setEnquireProduct(product)}
                className="flex-1 py-2.5 px-5 rounded-lg bg-[#093B2A] hover:bg-[#124831] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Extra Policy Links Strip */}
            <div className="pt-3 border-t border-[#F0EAE1] flex items-center space-x-5 text-[11px] text-stone-600">
              <button
                onClick={() => setOpenPolicyModal("why")}
                className="flex items-center space-x-1 hover:text-[#8F6D2C] transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8F6D2C]" />
                <span className="font-semibold underline">Why Choose Yashraj</span>
              </button>
              <button
                onClick={() => setOpenPolicyModal("policy")}
                className="flex items-center space-x-1 hover:text-[#8F6D2C] transition-colors cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5 text-[#8F6D2C]" />
                <span className="font-semibold underline">Yashraj Policy</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ADDITIONAL INFORMATION SECTION (#additional-information) */}
      <section id="additional-information" className="border-t border-[#E8DFC8] bg-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Left: Editorial / Model Photography (Compact, pure image, no border, no background color) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="overflow-hidden aspect-square w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-center">
                <img
                  src={product.descriptionImage || product.images[1] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Title & Accordions */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal">
                {product.name}
              </h2>

              <div className="divide-y divide-[#EAE2D2] border-y border-[#EAE2D2]">
                {/* ACCORDION 1: Product Description */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("description")}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-serif font-semibold text-stone-900 hover:text-[#8F6D2C] transition cursor-pointer"
                  >
                    <span>Product Description</span>
                    <span className="text-lg font-mono text-stone-500">
                      {accordionState.description ? "−" : "+"}
                    </span>
                  </button>
                  {accordionState.description && (
                    <div className="pt-2 text-xs text-stone-600 leading-relaxed space-y-1.5 animate-fade-in font-light">
                      <p>
                        {product.description ||
                          `Inspired by timeless temple architecture and traditional Odia karigari, this piece reflects heritage charm and fine craftsmanship. Every contour is delicately polished to preserve natural brilliance.`}
                      </p>
                      <p>
                        Manufactured and certified under strict Bureau of Indian Standards (BIS) hallmarking guidelines with unique laser HUID identification.
                      </p>
                    </div>
                  )}
                </div>

                {/* ACCORDION 2: Product Specification */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("specification")}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-serif font-semibold text-stone-900 hover:text-[#8F6D2C] transition cursor-pointer"
                  >
                    <span>Product Specification</span>
                    <span className="text-lg font-mono text-stone-500">
                      {accordionState.specification ? "−" : "+"}
                    </span>
                  </button>
                  {accordionState.specification && (
                    <div className="pt-2 overflow-x-auto animate-fade-in">
                      <table className="w-full text-xs text-left border-collapse">
                        <tbody className="divide-y divide-[#F2ECE1] text-stone-700">
                          <tr className="hover:bg-[#FAF9F5]">
                            <td className="py-2 px-3 text-stone-500 font-medium w-1/3">Color</td>
                            <td className="py-2 px-3 font-semibold text-stone-900">Golden</td>
                          </tr>
                          <tr className="hover:bg-[#FAF9F5]">
                            <td className="py-2 px-3 text-stone-500 font-medium">Size</td>
                            <td className="py-2 px-3 font-semibold text-stone-900">
                              {product.dimensions || "Free Size Standard"}
                            </td>
                          </tr>
                          <tr className="hover:bg-[#FAF9F5]">
                            <td className="py-2 px-3 text-stone-500 font-medium">Gender</td>
                            <td className="py-2 px-3 font-semibold text-stone-900 capitalize">
                              {product.gender === "women" ? "Female" : product.gender}
                            </td>
                          </tr>
                          <tr className="hover:bg-[#FAF9F5]">
                            <td className="py-2 px-3 text-stone-500 font-medium">Occasion</td>
                            <td className="py-2 px-3 font-semibold text-stone-900 capitalize">
                              {product.occasion === "wedding" ? "Vivaha Bridal" : product.occasion}
                            </td>
                          </tr>
                          <tr className="hover:bg-[#FAF9F5]">
                            <td className="py-2 px-3 text-stone-500 font-medium">Product Code</td>
                            <td className="py-2 px-3 font-mono font-bold text-stone-900">
                              {product.code}
                            </td>
                          </tr>
                          <tr className="hover:bg-[#FAF9F5]">
                            <td className="py-2 px-3 text-stone-500 font-medium">Stone</td>
                            <td className="py-2 px-3 font-semibold text-stone-900">
                              {product.stoneWeight || "No Stone"}
                            </td>
                          </tr>
                          <tr className="hover:bg-[#FAF9F5]">
                            <td className="py-2 px-3 text-stone-500 font-medium">Certification</td>
                            <td className="py-2 px-3 font-semibold text-[#8F6D2C]">
                              {product.certification || "100% BIS Hallmarked with HUID"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* ACCORDION 3: Metals & Weights */}
                <div className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("metals")}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-serif font-semibold text-stone-900 hover:text-[#8F6D2C] transition cursor-pointer"
                  >
                    <span>Metals &amp; Weight Breakdown</span>
                    <span className="text-lg font-mono text-stone-500">
                      {accordionState.metals ? "−" : "+"}
                    </span>
                  </button>
                  {accordionState.metals && (
                    <div className="pt-2 text-xs text-stone-700 space-y-1.5 animate-fade-in font-light">
                      <p>
                        <strong className="font-semibold text-stone-900">Material:</strong>{" "}
                        <span className="capitalize">{product.metal}</span>
                      </p>
                      <p>
                        <strong className="font-semibold text-stone-900">Purity:</strong>{" "}
                        <span>{product.purity}</span>
                      </p>
                      <p>
                        <strong className="font-semibold text-stone-900">Gross Weight:</strong>{" "}
                        <span className="font-mono font-medium">{product.grossWeight} gm</span>
                      </p>
                      <p>
                        <strong className="font-semibold text-stone-900">Net Metal Weight:</strong>{" "}
                        <span className="font-mono font-medium">{product.netGoldWeight} gm</span>
                      </p>
                      <p>
                        <strong className="font-semibold text-stone-900">Making Charges:</strong>{" "}
                        <span>₹{product.makingCharges.toLocaleString("en-IN")}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMILAR PRODUCTS CAROUSEL / GRID */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 border-t border-[#E8DFC8]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8F6D2C]">
                Explore More Creations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
                You May Also Like
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-[#8F6D2C] hover:text-stone-900 uppercase tracking-wider flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* MODAL: WHY CHOOSE YASHRAJ */}
      {openPolicyModal === "why" && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpenPolicyModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8]">
              <div className="flex items-center space-x-2 text-[#8F6D2C]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg text-stone-900">Why Choose Yashraj</h3>
              </div>
              <button
                onClick={() => setOpenPolicyModal(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>100% BIS 916 Hallmark with Unique HUID:</strong> Every ornament is tested and certified by Government assaying laboratories.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Transparent Price Breakdown:</strong> No hidden melting deductions or inflated wastage charges. Full itemized billing on every purchase.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Lifetime Exchange &amp; Buyback Guarantee:</strong> 100% exchange value on net gold weight across all Yashraj showrooms.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Artisanal Karigari Heritage:</strong> Over four decades of trusted trust, temple jewellery, and Odia filigree mastery.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: YASHRAJ POLICY */}
      {openPolicyModal === "policy" && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpenPolicyModal(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8]">
              <div className="flex items-center space-x-2 text-[#8F6D2C]">
                <Truck className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg text-stone-900">Yashraj Customer Policy</h3>
              </div>
              <button
                onClick={() => setOpenPolicyModal(null)}
                className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Insured Armored Delivery:</strong> All dispatched parcels are 100% transit-insured via armored logistics with tamper-evident seal.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Easy Exchange Policy:</strong> Bring your jewellery with invoice to any showroom for instant purity check and valuation.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Complimentary Spa &amp; Ultrasonic Cleaning:</strong> Free lifetime maintenance, ultrasonic cleaning, and prong tightening.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SOCIAL SHARE POPUP (Facebook, X, WhatsApp, Instagram) */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 border border-[#E8DFC8] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE1]">
              <div className="flex items-center space-x-2 text-[#8F6D2C]">
                <Share2 className="w-5 h-5 text-[#8F6D2C]" />
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Share this Jewellery
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition cursor-pointer"
                aria-label="Close share dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Snapshot */}
            <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-[#FAF9F5] border border-[#E8DFC8]">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 flex items-center justify-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="font-serif font-semibold text-xs sm:text-sm text-stone-900 truncate">
                  {product.name}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {product.purity} • <strong className="text-stone-900">₹{formattedPrice} (Approx)</strong>
                </p>
              </div>
            </div>

            {/* 4 Social Channels Grid: WhatsApp, Facebook, X, Instagram */}
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                Share via Social Media:
              </p>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center">
                {/* 1. WhatsApp */}
                <button
                  type="button"
                  onClick={() => {
                    const url = typeof window !== "undefined" ? window.location.href : "";
                    const text = encodeURIComponent(
                      `Namaste! Look at this gorgeous ${product.name} at Yashraj Jewellers (₹${formattedPrice} Approx):\n${url}`
                    );
                    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#F0FAF4] hover:bg-[#E3F6EB] border border-[#25D366]/30 transition group cursor-pointer shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-800 mt-2">WhatsApp</span>
                </button>

                {/* 2. Facebook */}
                <button
                  type="button"
                  onClick={() => {
                    const url = typeof window !== "undefined" ? window.location.href : "";
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                      "_blank",
                      "width=600,height=500"
                    );
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#F0F5FF] hover:bg-[#E4EEFF] border border-[#1877F2]/30 transition group cursor-pointer shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-800 mt-2">Facebook</span>
                </button>

                {/* 3. X (Twitter) */}
                <button
                  type="button"
                  onClick={() => {
                    const url = typeof window !== "undefined" ? window.location.href : "";
                    const text = encodeURIComponent(`Exquisite ${product.name} at Yashraj Jewellers:`);
                    window.open(
                      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
                      "_blank",
                      "width=600,height=500"
                    );
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-300 transition group cursor-pointer shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-800 mt-2">X</span>
                </button>

                {/* 4. Instagram */}
                <button
                  type="button"
                  onClick={async () => {
                    await handleCopyLink();
                    showToast("Link copied! Share it on your Instagram Story or Chat.");
                    window.open("https://www.instagram.com/", "_blank");
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FFF0F5] hover:bg-[#FFE5EE] border border-rose-300 transition group cursor-pointer shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-stone-800 mt-2">Instagram</span>
                </button>
              </div>
            </div>

            {/* Copy Link Input Bar */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                Or copy product link:
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== "undefined" ? window.location.href : ""}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 select-all focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-[#093B2A] text-white hover:bg-[#072F21] text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shrink-0"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#DFBA73]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
