"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import {
  X,
  Heart,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Video,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Share2,
  Send,
  MessageCircle,
} from "lucide-react";

export default function ProductDetailModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    setEnquireProduct,
    addToCart,
    addToWishlist,
    isInWishlist,
    setIsVideoCallOpen,
    showToast,
  } = useStore();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Standard / Size 14");
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = isInWishlist(product.id);

  const checkPincode = () => {
    if (pincode.length === 6) {
      setPincodeStatus("✓ Available! Insured Free Delivery by BlueDart / Malca-Amit within 48-72 hours.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Yashraj Jewellers!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header bar */}
        <div className="p-4 px-6 border-b border-[#E8DFC8] flex items-center justify-between bg-white/70">
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-bold text-[#8F6D2C] uppercase tracking-wider flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-[#8F6D2C]" />
              {product.certification}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 hover:text-black transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Gallery & Zoom Preview */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl bg-white border border-[#E8DFC8] overflow-hidden shadow-xs">
              <img
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.tag && (
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1F170F]/90 text-[#F5E8CB] border border-[#C5A059]/40">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      activeImgIndex === idx
                        ? "border-[#8F6D2C] shadow-sm"
                        : "border-stone-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Notice for the user */}
            <div className="p-3 bg-[#FAF3E0] rounded-xl border border-[#DEC9A2] text-[11px] text-stone-600">
              <span className="font-bold text-[#8F6D2C]">Photo Replacement:</span> You can easily drop your own high-resolution image in <code className="text-stone-800 font-mono">public/images/</code> and update the path in <code className="text-stone-800 font-mono">app/data/products.ts</code>.
            </div>

            {/* Guarantees Box */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-stone-600">
              <div className="p-2.5 rounded-lg bg-white border border-[#E8DFC8]">
                <ShieldCheck className="w-4 h-4 mx-auto text-[#8F6D2C] mb-1" />
                <span className="font-semibold block text-stone-900">100% BIS Hallmarked</span>
                <span>HUID Guaranteed</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#E8DFC8]">
                <RotateCcw className="w-4 h-4 mx-auto text-[#8F6D2C] mb-1" />
                <span className="font-semibold block text-stone-900">Lifetime Buyback</span>
                <span>Fair Valuation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-[#E8DFC8]">
                <Truck className="w-4 h-4 mx-auto text-[#8F6D2C] mb-1" />
                <span className="font-semibold block text-stone-900">Insured Transit</span>
                <span>100% Safe Delivery</span>
              </div>
            </div>
          </div>

          {/* Right: Specifications, Transparent Price & Purchase Actions */}
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                SKU: {product.code} • {product.category.toUpperCase()}
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1 leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold font-mono text-[#1F170F]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Includes All Taxes & Making
                </span>
              </div>

              {/* Itemized Transparent Billing Breakdown Table (Lalchnd style) */}
              <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Net Gold Value ({product.netGoldWeight}g @ ₹7,350/g):</span>
                  <span className="font-mono text-stone-900">
                    ₹{(product.price - product.makingCharges - product.gst).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Making Charges (Artisan Karigari):</span>
                  <span className="font-mono text-stone-900">
                    ₹{product.makingCharges.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Applicable GST (3%):</span>
                  <span className="font-mono text-stone-900">
                    ₹{product.gst.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-[#8F6D2C] pt-2 border-t border-stone-100 text-sm">
                  <span>Net Payable Showroom Price:</span>
                  <span className="font-mono">₹{product.price.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Size Selector if ring / bangles / general */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Select Size / Dimensions:
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Size 12", "Size 14 (Standard)", "Size 16", "Size 18", "Custom Made"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                      selectedSize === size
                        ? "border-[#8F6D2C] bg-[#FAF3E0] text-[#8F6D2C] font-bold"
                        : "border-stone-200 text-stone-700 hover:border-stone-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Check Pincode Delivery */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
              <label className="block font-semibold text-stone-700 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#8F6D2C]" />
                <span>Delivery & Showroom Availability:</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 751001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-hidden focus:border-[#8F6D2C]"
                />
                <button
                  onClick={checkPincode}
                  className="px-4 py-1.5 bg-stone-900 hover:bg-black text-white font-semibold rounded-lg"
                >
                  Check
                </button>
              </div>
              {pincodeStatus && (
                <p className="text-[11px] font-medium text-emerald-700 animate-fade-in">
                  {pincodeStatus}
                </p>
              )}
            </div>

            {/* Primary Action Buttons: Enquire & WhatsApp */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    setEnquireProduct(product);
                  }}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-[#C5A059]/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enquire Now (Get Showroom Quote)</span>
                </button>

                {/* Direct WhatsApp link */}
                <a
                  href={`https://wa.me/916742534016?text=${encodeURIComponent(
                    `Hello Yashraj Jewellers, I would like to enquire about: ${product.name} (${product.code}), Quoted Price: ₹${product.price.toLocaleString("en-IN")}. Please share details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => addToCart(product, selectedSize)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#FAF3E0] hover:bg-[#EEDBB2] text-[#7A5B1F] font-semibold text-xs tracking-wider transition flex items-center justify-center space-x-2 border border-[#DEC9A2]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add To Enquiry Bag</span>
                </button>

                <button
                  onClick={() => addToWishlist(product)}
                  className={`p-2.5 px-3.5 rounded-xl border transition ${
                    isWish
                      ? "border-rose-400 bg-rose-50 text-rose-600"
                      : "border-stone-300 hover:border-stone-500 text-stone-700"
                  }`}
                  aria-label="Wishlist"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWish ? "fill-rose-600 text-rose-600" : ""}`} />
                </button>
              </div>

              {/* Book Video Consultation */}
              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  setIsVideoCallOpen(true);
                }}
                className="w-full py-2.5 rounded-xl border border-[#8F6D2C] text-[#8F6D2C] hover:bg-[#FAF3E0] font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
              >
                <Video className="w-4 h-4" />
                <span>Schedule Live HD Video Viewing with Karigar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
