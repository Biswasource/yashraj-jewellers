"use client";

import React, { useState } from "react";
import { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Heart, Eye, ShoppingBag, ShieldCheck, Sparkles, Video, Send, MessageCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    addToCart,
    addToWishlist,
    isInWishlist,
    setQuickViewProduct,
    setEnquireProduct,
    setIsVideoCallOpen,
  } = useStore();

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const isWish = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group bg-white rounded-2xl border border-[#EBE3D3] hover:border-[#C5A059] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* 1. IMAGE CONTAINER & HOVER OVERLAYS */}
      <div
        className="relative w-full aspect-square bg-[#F7F5F0] overflow-hidden cursor-pointer"
        onMouseEnter={() => product.images.length > 1 && setCurrentImgIndex(1)}
        onMouseLeave={() => setCurrentImgIndex(0)}
        onClick={() => setQuickViewProduct(product)}
      >
        {/* Product Image */}
        <img
          src={product.images[currentImgIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1F170F]/85 text-[#F5E8CB] border border-[#C5A059]/40 backdrop-blur-xs">
              {product.tag}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white w-max">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
            isWish
              ? "bg-rose-50 text-rose-600 shadow-md scale-110"
              : "bg-white/80 hover:bg-white text-stone-600 hover:text-rose-600 shadow-xs"
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWish ? "fill-rose-600 text-rose-600" : ""}`} />
        </button>

        {/* Floating Quick Action Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold shadow flex items-center justify-center space-x-1 backdrop-blur-xs transition"
          >
            <Eye className="w-3.5 h-3.5 text-[#8F6D2C]" />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoCallOpen(true);
            }}
            className="p-2 rounded-lg bg-[#FAF3E0]/90 hover:bg-[#FAF3E0] text-[#8F6D2C] shadow flex items-center justify-center backdrop-blur-xs transition"
            title="Book Video Shopping for this item"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. PRODUCT DETAILS */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Purity & Hallmark Banner */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="font-semibold text-[#8F6D2C] uppercase tracking-wider flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#8F6D2C]" />
              {product.purity}
            </span>
            <span className="font-mono text-stone-400 text-[10px]">{product.code}</span>
          </div>

          {/* Product Title */}
          <h4
            onClick={() => setQuickViewProduct(product)}
            className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-[#8F6D2C] transition-colors cursor-pointer"
          >
            {product.name}
          </h4>

          {/* Weight specs */}
          <div className="mt-2 text-xs text-stone-500 flex items-center space-x-2">
            <span>Gross Wt: <strong className="text-stone-700">{product.grossWeight}g</strong></span>
            <span>•</span>
            <span>Making: <strong className="text-stone-700">₹{product.makingCharges.toLocaleString("en-IN")}</strong></span>
          </div>
        </div>

        {/* 3. PRICE & CART ACTION */}
        <div className="mt-4 pt-3 border-t border-[#F0EAE1]">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-lg sm:text-xl font-bold font-mono text-stone-900">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Price breakdown toggle */}
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-[10px] font-semibold text-[#8F6D2C] hover:underline"
            >
              Price Breakup ℹ
            </button>
          </div>

          {/* Itemized price breakdown popover */}
          {showBreakdown && (
            <div className="mt-2 p-2.5 bg-[#FAF3E0] rounded-lg border border-[#E8DFC8] text-[11px] text-stone-700 space-y-1 animate-fade-in">
              <div className="flex justify-between">
                <span>Gold Value ({product.netGoldWeight}g):</span>
                <span>₹{(product.price - product.makingCharges - product.gst).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Making Charges:</span>
                <span>₹{product.makingCharges.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (3%):</span>
                <span>₹{product.gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-bold text-[#8F6D2C] pt-1 border-t border-[#DEC9A2]">
                <span>Total Transparent Price:</span>
                <span>₹{product.price.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}

          {/* Action Buttons: Enquire Now & WhatsApp / Bag */}
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => setEnquireProduct(product)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-md hover:brightness-105 transition-all flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>

            {/* Direct WhatsApp link */}
            <a
              href={`https://wa.me/916742534016?text=${encodeURIComponent(
                `Hello Yashraj Jewellers, I would like to enquire about: ${product.name} (${product.code}), Quoted: ₹${product.price.toLocaleString("en-IN")}. Please share details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center justify-center shadow-xs"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Add to Enquiry List */}
            <button
              onClick={() => addToCart(product)}
              className="p-2.5 rounded-xl bg-[#FAF3E0] hover:bg-[#C5A059] text-[#7A5B1F] hover:text-white transition flex items-center justify-center border border-[#DEC9A2]"
              title="Add to Enquiry Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
