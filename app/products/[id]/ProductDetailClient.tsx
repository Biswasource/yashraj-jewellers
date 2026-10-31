"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, getRelatedProducts, LIVE_RATES } from "../../data/products";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../../components/ProductCard";
import {
  Heart,
  ShoppingBag,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Share2,
  Send,
  MessageCircle,
  Star,
  ChevronRight,
  Info,
  Calendar,
  Gem,
  Check,
  Scale,
  Award,
  ArrowRight,
  PhoneCall,
  Clock,
  Eye,
  TrendingUp,
} from "lucide-react";

interface ProductDetailClientProps {
  product?: Product;
  productId?: string;
}

export default function ProductDetailClient({ product: initialProduct, productId }: ProductDetailClientProps) {
  const {
    products,
    getProduct,
    addToCart,
    addToWishlist,
    isInWishlist,
    setEnquireProduct,
    showToast,
  } = useStore();

  const lookupId = productId || initialProduct?.id;
  const product = (lookupId ? getProduct(lookupId) : undefined) || initialProduct;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"specifications" | "price" | "karigari" | "care" | "reviews">("specifications");

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF3E0] border border-[#DEC9A2] flex items-center justify-center text-[#8F6D2C]">
          <Gem className="w-10 h-10" />
        </div>
        <h1 className="font-serif font-bold text-3xl text-stone-900">
          Jewellery Piece Not Found
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          The creation you are looking for is currently unavailable in the showroom catalogue or may have been purchased by a collector.
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

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Yashraj Jewellers!`,
        url: window.location.href,
      });
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!");
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Yashraj Jewellers, I would like to enquire about this piece:
*${product.name}*
SKU: ${product.code}
Price Quoted: ₹${product.price.toLocaleString("en-IN")}
Purity: ${product.purity}
Weight: ${product.grossWeight}g
URL: ${typeof window !== "undefined" ? window.location.href : `https://yashrajjewellers.in/products/${product.id}`}

Please share more high-definition photos and showroom availability.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
      {/* 1. BREADCRUMBS */}
      <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-6 font-medium">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
        <Link href="/products" className="hover:text-stone-900 transition-colors">
          Jewellery
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-stone-900 transition-colors capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
        <span className="text-stone-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. MAIN PRODUCT HERO: GALLERY (LEFT) + DETAILS (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* LEFT COLUMN: MULTI-IMAGE GALLERY (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-3xl bg-[#FAF9F5] border border-[#E8DFC8] overflow-hidden shadow-md group">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 cursor-zoom-in"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.tag && (
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1A130B]/90 text-[#F5E8CB] border border-[#C5A059]/50 shadow-md backdrop-blur-xs flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFBA73]" />
                    <span>{product.tag}</span>
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-600 text-white w-max shadow-sm">
                    Save {discountPercent}% Special
                  </span>
                )}
              </div>

              {/* Wishlist & Share Float */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => addToWishlist(product)}
                  className={`p-2.5 rounded-full shadow-md backdrop-blur-xs transition-transform duration-200 cursor-pointer ${
                    isWish
                      ? "bg-rose-50 text-rose-600 scale-110"
                      : "bg-white/90 hover:bg-white text-stone-700 hover:text-rose-600"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWish ? "fill-rose-600" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 shadow-md backdrop-blur-xs transition cursor-pointer"
                  title="Share Product"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImgIndex === idx
                        ? "border-[#8F6D2C] ring-2 ring-[#DFBA73]/40 scale-105"
                        : "border-[#E8DFC8] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SPECS, PRICING & ACTIONS (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Header & Title */}
          <div>
            <div className="flex items-center space-x-2 text-[11px] text-[#8F6D2C] mb-1.5 font-medium">
              <span className="uppercase tracking-wider">{product.metal} Jewellery</span>
              <span>•</span>
              <span className="font-mono text-stone-400">SKU: {product.code}</span>
            </div>
            <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-stone-900 leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-2.5 flex items-center gap-2 text-xs text-stone-600">
              <div className="flex items-center space-x-1 bg-[#FAF3E0] px-2 py-0.5 rounded-full border border-[#DEC9A2]">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? "fill-amber-400" : "text-stone-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-stone-900 font-mono text-[11px] ml-0.5">{product.rating}</span>
                <span className="text-stone-500 text-[11px]">({product.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8DFC8] space-y-2.5">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">
                  Wholesale Net Price (Incl. GST)
                </p>
                <div className="flex items-baseline space-x-2.5 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-stone-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs sm:text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              {/* In stock badge */}
              <div className="text-right">
                <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>In Stock</span>
                </span>
              </div>
            </div>

            {/* Quick Live Rate Context */}
            <div className="text-[11px] text-stone-500 flex items-center space-x-1.5 pt-2 border-t border-[#F0E6D2]">
              <TrendingUp className="w-3.5 h-3.5 text-[#8F6D2C]" />
              <span>
                Live bullion: <strong>22K @ ₹{LIVE_RATES.gold22k}/g</strong> • Transparent minimal karigari charges.
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS: WhatsApp + Bag + Enquire */}
          <div className="space-y-2.5 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* WhatsApp Primary Consultation CTA */}
              <a
                href={`https://wa.me/917008343796?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider shadow-xs hover:shadow transition-all flex items-center justify-center space-x-2 text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Instant WhatsApp Enquiry</span>
              </a>

              {/* Add to Enquiry Bag */}
              <button
                onClick={() => addToCart(product)}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-stone-950 font-semibold text-xs uppercase tracking-wider shadow-xs hover:shadow hover:brightness-105 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Enquiry Bag</span>
              </button>
            </div>

            {/* Secondary: Formal Custom Quote / Schedule Visit */}
            <div className="flex space-x-2.5">
              <button
                onClick={() => setEnquireProduct(product)}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-[#FAF3E0] text-[#7A5B1F] border border-[#DEC9A2] font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5 shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Official Price Quotation</span>
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-600 border border-stone-200 transition flex items-center space-x-1.5 shadow-2xs text-xs font-medium"
              >
                <Heart className={`w-3.5 h-3.5 ${isWish ? "fill-rose-600 text-rose-600" : ""}`} />
                <span>{isWish ? "Saved" : "Wishlist"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DETAILED INFORMATION TABS */}
      <section className="mt-14 pt-8 border-t border-[#E8DFC8]">
        {/* Tab Headers */}
        <div className="flex items-center space-x-2 border-b border-[#DEC9A2] overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "specifications", label: "Full Specifications" },
            { id: "price", label: "Transparent Price Breakup" },
            { id: "karigari", label: "Artisanal Karigari Story" },
            { id: "care", label: "Gold & Diamond Care" },
            { id: "reviews", label: `Customer Reviews (${product.reviewsCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-serif font-semibold tracking-wide whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#8F6D2C] text-[#8F6D2C] bg-[#FAF3E0]/50 rounded-t-lg"
                  : "border-transparent text-stone-500 hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="py-6">
          {/* TAB 1: SPECIFICATIONS */}
          {activeTab === "specifications" && (
            <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
              <h3 className="font-serif font-semibold text-lg text-stone-900">
                Detailed Product Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs sm:text-sm text-stone-700">
                <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                  <span className="text-stone-500">Product Name:</span>
                  <span className="font-semibold text-stone-900">{product.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                  <span className="text-stone-500">Unique Hallmark Code:</span>
                  <span className="font-mono font-bold text-stone-900">{product.code}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                  <span className="text-stone-500">Metal &amp; Alloy:</span>
                  <span className="font-semibold text-stone-900 capitalize">{product.metal}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                  <span className="text-stone-500">Purity Standard:</span>
                  <span className="font-bold text-[#8F6D2C]">{product.purity}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                  <span className="text-stone-500">Gross Weight:</span>
                  <span className="font-mono font-bold text-stone-900">{product.grossWeight} grams</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                  <span className="text-stone-500">Net Pure Metal Weight:</span>
                  <span className="font-mono font-bold text-stone-900">{product.netGoldWeight} grams</span>
                </div>
                {product.stoneWeight && (
                  <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                    <span className="text-stone-500">Stone / Diamond Specs:</span>
                    <span className="font-semibold text-stone-900">{product.stoneWeight}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                  <span className="text-stone-500">Occasion &amp; Wearability:</span>
                  <span className="font-semibold text-stone-900 capitalize">{product.occasion}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                  <span className="text-stone-500">Gender / Fit:</span>
                  <span className="font-semibold text-stone-900 capitalize">{product.gender}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] text-xs text-stone-600 leading-relaxed">
                <p><strong>Artisan Description:</strong> {product.description}</p>
              </div>
            </div>
          )}

          {/* TAB 2: PRICE BREAKUP */}
          {activeTab === "price" && (
            <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    Transparent Itemized Billing
                  </h3>
                  <p className="text-xs text-stone-500">
                    Unlike traditional retail jewelers with hidden wastage margins, Yashraj guarantees 100% itemized transparency.
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full w-max">
                  Zero Hidden Melting Margin
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF3E0] text-[#7A5B1F] border-b border-[#DEC9A2]">
                      <th className="py-3 px-4 font-bold">Billing Component</th>
                      <th className="py-3 px-4 font-bold">Weight / Carats</th>
                      <th className="py-3 px-4 font-bold">Rate</th>
                      <th className="py-3 px-4 font-bold text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE1] text-stone-700">
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-stone-900">
                        Pure Gold Value ({product.purity})
                      </td>
                      <td className="py-3.5 px-4 font-mono">{product.netGoldWeight}g</td>
                      <td className="py-3.5 px-4 font-mono">₹{LIVE_RATES.gold22k}/g</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-right text-stone-900">
                        ₹{(product.price - product.makingCharges - product.gst).toLocaleString("en-IN")}
                      </td>
                    </tr>
                    {product.stoneWeight && (
                      <tr>
                        <td className="py-3.5 px-4 font-semibold text-stone-900">
                          Precious Stones / Certified Diamonds
                        </td>
                        <td className="py-3.5 px-4">{product.stoneWeight}</td>
                        <td className="py-3.5 px-4">Direct Assayed</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-right text-stone-900">
                          Included in quoted price
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-stone-900">
                        Making &amp; Karigari Charges
                      </td>
                      <td className="py-3.5 px-4">—</td>
                      <td className="py-3.5 px-4 font-mono">Special Wholesale Rate</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-right text-stone-900">
                        ₹{product.makingCharges.toLocaleString("en-IN")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-stone-900">
                        Government GST (3%)
                      </td>
                      <td className="py-3.5 px-4">—</td>
                      <td className="py-3.5 px-4 font-mono">3.00% Statutory</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-right text-stone-900">
                        ₹{product.gst.toLocaleString("en-IN")}
                      </td>
                    </tr>
                    <tr className="bg-[#FAF9F5] font-bold text-stone-950 text-base">
                      <td className="py-4 px-4 font-serif text-[#8F6D2C]" colSpan={3}>
                        Grand Total Final Transparent Price:
                      </td>
                      <td className="py-4 px-4 font-mono text-right text-[#8F6D2C]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: KARIGARI STORY */}
          {activeTab === "karigari" && (
            <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs space-y-4 animate-fade-in text-xs sm:text-sm text-stone-700 leading-relaxed">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                The Heritage Karigari &amp; Craftsmanship
              </h3>
              <p>
                Each creation from Yashraj Jewellers carries forward over 40 years of Odisha artisanal mastery. Our master goldsmiths in Bhubaneswar and Cuttack spend countless hours twisting, engraving, and polishing each ornament to timeless perfection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8DFC8] space-y-1.5">
                  <span className="font-serif font-bold text-[#8F6D2C] text-sm">
                    1. Sacred Handcrafting
                  </span>
                  <p className="text-[11px] text-stone-600">
                    Motifs inspired by Jagannath Temple architecture, Mayura plumes, and antique Vivaha patterns.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8DFC8] space-y-1.5">
                  <span className="font-serif font-bold text-[#8F6D2C] text-sm">
                    2. HUID Laser Assay
                  </span>
                  <p className="text-[11px] text-stone-600">
                    Laser etched with Govt. Bureau of Indian Standards HUID guarantee card.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8DFC8] space-y-1.5">
                  <span className="font-serif font-bold text-[#8F6D2C] text-sm">
                    3. Anti-Tarnish Finish
                  </span>
                  <p className="text-[11px] text-stone-600">
                    Dual micro-layer protective coating preventing daily oxidation while maintaining natural gold glow.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GOLD CARE */}
          {activeTab === "care" && (
            <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs space-y-4 animate-fade-in text-xs sm:text-sm text-stone-700 leading-relaxed">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                How to Preserve &amp; Care for Your Fine Jewellery
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                  <span>
                    <strong>Avoid Direct Perfumes:</strong> Spray hairspray and perfumes before putting on your gold and diamond ornaments to prevent chemical residue.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                  <span>
                    <strong>Complimentary Ultrasonic Cleaning:</strong> Bring your Yashraj ornaments to any of our 6 showrooms in Bhubaneswar, Cuttack, or Delhi anytime for complimentary ultrasonic spa cleaning.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6D2C] shrink-0 mt-0.5" />
                  <span>
                    <strong>Storage:</strong> Store individual items in their original silk velvet Yashraj pouches to avoid interlocking scratches.
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F2ECE1] gap-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="font-serif text-4xl font-bold text-stone-900">
                      {product.rating}
                    </p>
                    <div className="flex text-amber-500 justify-center my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-500 font-mono">
                      {product.reviewsCount} verified reviews
                    </p>
                  </div>
                  <div className="h-12 w-px bg-stone-200 hidden sm:block" />
                  <p className="text-xs text-stone-600 max-w-sm">
                    100% of customers recommend Yashraj Jewellers for purity transparency and heirloom craftsmanship.
                  </p>
                </div>
                <a
                  href={`https://wa.me/917008343796?text=${encodeURIComponent(
                    `Hello Yashraj Jewellers, I would like to submit a customer review or photo for: ${product.name} (${product.code}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-[#8F6D2C] text-white font-bold text-xs uppercase tracking-wider transition text-center shadow-xs"
                >
                  Write a Verified Review
                </a>
              </div>

              {/* Sample Verified Reviews */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8DFC8] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif font-bold text-stone-900 text-sm">
                        Satyabrata Pattnaik
                      </p>
                      <p className="text-[10px] text-stone-400">
                        Purchased at Master Canteen Flagship • Verified Buyer
                      </p>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    &ldquo;The finish is magnificent. Checked the HUID hallmark number on the BIS Care app and it immediately verified the exact 22KT purity and Yashraj jeweler registry. The weight was exact down to the milligram.&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8DFC8] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif font-bold text-stone-900 text-sm">
                        Ritu &amp; Ashish Singhania
                      </p>
                      <p className="text-[10px] text-stone-400">
                        Online Order Delivered to New Delhi • Insured Transit
                      </p>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    &ldquo;Arrived in Delhi within 48 hours via BlueDart armored service. The tamper-evident packaging and silk-lined box made unboxing feel like a true royal celebration. Unbelievable price compared to Delhi retail showrooms!&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. RELATED / MATCHING HERITAGE JEWELLERY */}
      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-[#E8DFC8]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8F6D2C] flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#DFBA73]" />
                <span>Complete the Imperial Look</span>
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 mt-1">
                Matching Heritage Creations
              </h2>
            </div>
            <Link
              href={`/products?category=${product.category}`}
              className="text-xs font-bold text-[#8F6D2C] hover:text-stone-900 uppercase tracking-wider flex items-center space-x-1"
            >
              <span>Explore All {product.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
