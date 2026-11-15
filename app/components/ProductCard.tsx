"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, isInWishlist } = useStore();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const isWish = isInWishlist(product.id);

  // Format price with 2 decimals: ₹64,345.73 (Approx)
  const formattedPrice = product.price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="group flex flex-col justify-between transition-all duration-300">
      <div>
        {/* 1. IMAGE CONTAINER WITH ZERO PADDING & NO BACKGROUND COLOR OR BORDER */}
        <div
          className="relative w-full aspect-square overflow-hidden cursor-pointer flex items-center justify-center transition-all duration-300"
          onMouseEnter={() => product.images.length > 1 && setCurrentImgIndex(1)}
          onMouseLeave={() => setCurrentImgIndex(0)}
        >
          {/* Product Image Link to Detail Page */}
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <img
              src={product.images[currentImgIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Discreet Wishlist Button (hover on desktop, subtle on mobile) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWishlist(product);
            }}
            className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-all duration-200 ${
              isWish
                ? "bg-white text-rose-600 shadow-sm opacity-100"
                : "bg-white/70 hover:bg-white text-stone-500 hover:text-rose-600 opacity-0 group-hover:opacity-100 shadow-xs"
            }`}
            aria-label="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWish ? "fill-rose-600 text-rose-600" : ""}`} />
          </button>
        </div>

        {/* 2. PRODUCT DETAILS (MINIMALIST COMPACT LUXURY STYLE) */}
        <div className="pt-2 pb-0.5 flex flex-col text-left">
          {/* Title */}
          <Link href={`/products/${product.id}`} className="block group-hover:text-[#8F6D2C]">
            <h4 className="font-serif font-medium text-stone-900 text-xs sm:text-sm leading-snug line-clamp-1 hover:text-[#8F6D2C] transition-colors cursor-pointer">
              {product.name}
            </h4>
          </Link>

          {/* Price with (Approx) */}
          <p className="text-xs sm:text-[13px] font-bold text-stone-900 mt-0.5">
            ₹{formattedPrice}{" "}
            <span className="font-normal text-stone-600 text-[10px] sm:text-[11px]">
              (Approx)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
