"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "../data/products";
import { Star, CheckCircle2, Quote, ChevronLeft, ChevronRight, Pause, Play, Heart } from "lucide-react";
import { AnimatedText, MotionFadeIn } from "./ui/AnimatedText";

export default function CustomerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll loop with zoom-in and zoom-out transition
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Create an extended array for infinite marquee flow
  const infiniteReviews = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-100 overflow-hidden relative selection:bg-[#DFBA73]/30">
      {/* Decorative luxury background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#DFBA73]/10 via-[#C5A059]/15 to-[#DFBA73]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <MotionFadeIn delay={0.1}>
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8F6D2C] bg-[#FAF6EE] border border-[#E8DCBE] px-4 py-1.5 rounded-full mb-3 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-[#E2A62C] text-[#E2A62C]" />
              <span>4.9 / 5.0 Rated Across 2,800+ Customer Reviews</span>
            </div>
          </MotionFadeIn>

          <AnimatedText
            text="Voices of Trust & Delight"
            el="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#093B2A] tracking-tight justify-center"
          />

          <MotionFadeIn delay={0.25}>
            <p className="text-xs sm:text-sm text-[#5A6E82] mt-3 leading-relaxed max-w-2xl mx-auto">
              Hear from families across generations who made Yashraj Jewellers part of their cherished wedding moments and heirloom legacy.
            </p>
          </MotionFadeIn>
        </div>

        {/* =========================================================================
            1. FEATURED 3D FOCUS SLIDER (Comes in -> Zooms In -> Zooms Out -> Scrolls)
           ========================================================================= */}
        <div className="relative mb-16">
          {/* Main 3-card viewport */}
          <div className="relative h-[340px] sm:h-[310px] w-full max-w-4xl mx-auto flex items-center justify-center">
            {TESTIMONIALS.map((item, idx) => {
              // Calculate relative position to activeIndex (-1: left, 0: center, 1: right)
              const total = TESTIMONIALS.length;
              let diff = (idx - activeIndex + total) % total;
              if (diff > total / 2) diff -= total;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;
              const isVisible = isCenter || isLeft || isRight;

              if (!isVisible) return null;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`absolute transition-all duration-700 ease-in-out cursor-pointer p-6 sm:p-8 rounded-3xl border ${
                    isCenter
                      ? "z-30 scale-100 sm:scale-105 opacity-100 bg-white border-[#D4AF37] shadow-2xl ring-4 ring-[#E2A62C]/20 translate-x-0"
                      : isLeft
                      ? "z-10 scale-85 sm:scale-90 opacity-40 bg-[#FAF8F5] border-stone-200 -translate-x-[65%] sm:-translate-x-[75%] blur-[0.6px]"
                      : "z-10 scale-85 sm:scale-90 opacity-40 bg-[#FAF8F5] border-stone-200 translate-x-[65%] sm:translate-x-[75%] blur-[0.6px]"
                  } w-[90%] sm:w-[540px] max-w-lg`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-[#E2A62C]/40" />
                    <div className="flex space-x-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#E2A62C] text-[#E2A62C]" />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#093B2A] mb-2 leading-snug">
                    &ldquo;{item.title}&rdquo;
                  </h4>

                  <p className="text-xs sm:text-sm text-[#5A6E82] leading-relaxed line-clamp-3 italic mb-5">
                    {item.text}
                  </p>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#093B2A]">
                        {item.name}
                      </h5>
                      <p className="text-[11px] text-[#8F6D2C] font-medium">{item.location}</p>
                    </div>

                    {item.verified && (
                      <span className="inline-flex items-center text-[10px] sm:text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls & Pagination Indicators */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="w-10 h-10 rounded-full border border-stone-200 bg-white hover:bg-[#093B2A] hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-xs hover:shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center space-x-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-6 bg-[#E2A62C]" : "w-2 bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="w-10 h-10 rounded-full border border-stone-200 bg-white hover:bg-[#093B2A] hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-xs hover:shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
              className="w-8 h-8 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-all ml-2"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. INFINITE CONTINUOUS AUTO-SCROLL RIBBON (Interactive Hover & Zoom)
           ========================================================================= */}
        <div className="mt-14 pt-12 border-t border-stone-100">
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400">
              Continuous Feed • 10 Verified Family Reviews
            </span>
          </div>

          {/* Marquee Wrapper with left/right fade masks */}
          <div className="relative w-full overflow-hidden">
            {/* Fade gradients at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Seamless Infinite Marquee Track */}
            <div className="flex animate-marquee space-x-6 py-4">
              {infiniteReviews.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx % TESTIMONIALS.length)}
                  className="w-[320px] sm:w-[360px] shrink-0 bg-white rounded-2xl p-5 border border-stone-200/90 hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex space-x-0.5">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#E2A62C] text-[#E2A62C]" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>

                    <h5 className="font-serif font-bold text-xs sm:text-sm text-[#093B2A] line-clamp-1 mb-1.5 group-hover:text-[#8F6D2C] transition-colors">
                      {item.title}
                    </h5>

                    <p className="text-[11px] text-[#5A6E82] leading-relaxed line-clamp-3 italic">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-stone-800">{item.name}</span>
                    <span className="text-[#8F6D2C]">{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
