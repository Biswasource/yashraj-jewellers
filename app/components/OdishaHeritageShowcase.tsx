"use client";

import React from "react";
import { useStore } from "../context/StoreContext";
import { Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function OdishaHeritageShowcase() {
  const { setSelectedMetal, scrollToProducts, setIsVideoCallOpen } = useStore();

  return (
    <section className="py-20 bg-[#1D150B] text-white relative overflow-hidden">
      {/* Decorative filigree background pattern simulation */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1611591475879-11536b135154?auto=format&fit=crop&w=1200&q=80"
                alt="Odisha Silver Filigree Tarakasi"
                className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140D06] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1A1208]/90 border border-[#C5A059]/40 backdrop-blur-md">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#DFBA73]">
                  GI-Tagged Craft of Cuttack
                </span>
                <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                  The Silver Filigree (Tarakasi) Art
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  Drawn using hair-thin 99.9% pure silver wire, spun into intricate peacock, floral, and bridal designs.
                </p>
              </div>
            </div>

            {/* Floating Heritage Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#DFBA73] to-[#9E7B35] text-stone-900 p-4 rounded-2xl shadow-xl border border-white/20 hidden sm:block">
              <p className="text-2xl font-serif font-bold">500+ Yrs</p>
              <p className="text-[10px] font-bold uppercase tracking-wider">Living Art Form</p>
            </div>
          </div>

          {/* Right: Narrative & Call to Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#2D200E] border border-[#C5A059]/40 px-3.5 py-1 rounded-full text-xs text-[#F5E8CB]">
              <Sparkles className="w-3.5 h-3.5 text-[#DFBA73]" />
              <span className="font-semibold uppercase tracking-wider">
                Living Heritage of Odisha
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF8F5] leading-tight">
              Where Ancient Odia Craft Meets Modern Grandeur
            </h2>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              From the divine adornments of Lord Jagannath during the golden Suna Besha to the delicate silver filigree of Cuttack, Odisha is the cradle of sublime metallurgy. At Yashraj Jewellers, our master karigars carry forward this sacred lineage with hallmarked 22K gold and 925 sterling silver.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-[#251A0E] border border-[#C5A059]/30">
                <h5 className="font-serif font-bold text-sm text-[#DFBA73] mb-1">
                  Authentic Tarakasi Wire
                </h5>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Hand-spun by generational award-winning artisans of Cuttack.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#251A0E] border border-[#C5A059]/30">
                <h5 className="font-serif font-bold text-sm text-[#DFBA73] mb-1">
                  Temple Gold Replicas
                </h5>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  Traditional Mayura jhumkas, kasu malais, and Lakshmi antique harams.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  setSelectedMetal("silver");
                  scrollToProducts();
                }}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-[#C5A059]/25 transition flex items-center space-x-2"
              >
                <span>View Silver Filigree Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsVideoCallOpen(true)}
                className="px-6 py-3.5 rounded-full border border-[#C5A059]/50 text-[#F5E8CB] font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition"
              >
                Watch Karigar In Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
