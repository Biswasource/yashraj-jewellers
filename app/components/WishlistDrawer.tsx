"use client";

import React from "react";
import { useStore } from "../context/StoreContext";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    addToCart,
    scrollToProducts,
  } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-stone-200">
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#E8DFC8] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Saved Masterpieces ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF3E0] text-[#8F6D2C] flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 opacity-70" />
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-800">
                Your Wishlist is Empty
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Save your favorite bridal chokers, diamond rings, and pure gold jewellery by tapping the heart icon on any piece.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  scrollToProducts();
                }}
                className="px-6 py-2.5 rounded-full bg-[#8F6D2C] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#72551F] transition"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-white rounded-xl border border-[#E8DFC8] flex space-x-3 shadow-2xs"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover border border-stone-200"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h5 className="font-serif font-bold text-xs text-stone-900 line-clamp-1">
                        {product.name}
                      </h5>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-stone-400 hover:text-rose-600 p-0.5 ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-stone-500 font-mono">
                      {product.code} • {product.purity}
                    </p>
                    <p className="text-xs font-bold font-mono text-[#8F6D2C] mt-1">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                    }}
                    className="mt-2 py-1.5 px-3 rounded-lg bg-[#FAF3E0] hover:bg-[#C5A059] text-[#7A5B1F] hover:text-white font-semibold text-[11px] transition flex items-center justify-center space-x-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E8DFC8]">
            <button
              onClick={() => {
                wishlist.forEach((p) => addToCart(p));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-md transition"
            >
              Move All To Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
