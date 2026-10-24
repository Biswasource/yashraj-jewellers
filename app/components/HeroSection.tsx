"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../context/StoreContext";
import { ChevronLeft, ChevronRight, Sparkles, Shield, ArrowRight } from "lucide-react";
import { AnimatedText, MotionFadeIn, MotionStagger, MotionStaggerItem } from "./ui/AnimatedText";

const HERO_SLIDES = [
  {
    id: 1,
    tag: "Sell Your Gold • Instant Cash & Highest Market Price",
    title: "Instant Cash for Old Gold at Best Market Price",
    subtitle:
      "Sell your old or broken gold for immediate spot cash or instant bank transfer. 100% transparent Karatmeter digital assay in front of you with zero hidden deductions and highest live bullion rate.",
    cta: "Sell Gold for Instant Cash",
    secondaryCta: "Check Today's Rate",
    image: "/images/hero/slide-bridal-gold.jpg",
    category: "necklaces",
  },
  {
    id: 2,
    tag: "Direct Gold Wholesaler • Minimal Price & Making Charges",
    title: "Direct Gold Wholesaler at Lowest Wholesale Prices",
    subtitle:
      "Buy certified 22K & 24K gold jewellery directly from the wholesaler. Get minimal making charges, zero middleman margins, and pure 100% BIS 916 hallmarked bridal and daily collections.",
    cta: "Explore Wholesale Jewellery",
    secondaryCta: "Wholesale Partner Enquiry",
    image: "/images/hero/slide-temple-polki.jpg",
    metal: "gold",
  },
  {
    id: 3,
    tag: "Odisha's Most Trusted Jeweller Since 1982",
    title: "Best Luxury Jewellery for Life's Grand Moments",
    subtitle:
      "From royal Vivaha antique chokers and certified diamond solitaires to authentic Cuttack Tarakasi silver filigree. The best designs with unbeatable wholesale pricing and lifetime exchange.",
    cta: "Shop Best Jewellery",
    secondaryCta: "Book Showroom Visit",
    image: "/images/hero/slide-solitaire-diamond.jpg",
    metal: "diamond",
  },
  {
    id: 4,
    tag: "100% Purity Assay • Transparent Karatmeter Testing",
    title: "Exchange Old Gold for New Trending Ornaments",
    subtitle:
      "Upgrade your old jewellery to the latest 2026 designs at minimum conversion cost. Full weight-for-weight valuation, guaranteed purity testing, and zero risk buyback assurance.",
    cta: "Explore Gold Exchange",
    secondaryCta: "Free Purity Valuation",
    image: "/images/hero/slide-silver-filigree.jpg",
    metal: "silver",
  },
];

const QUICK_CATEGORIES = [
  {
    name: "EARRINGS",
    category: "earrings",
    image: "https://lalchnd.com/images/lalchnd/home/earrings.webp",
  },
  {
    name: "BANGLES",
    category: "bangles",
    image: "https://lalchnd.com/images/lalchnd/home/bangels.webp",
  },
  {
    name: "BRACELETS",
    category: "bracelets",
    image: "https://lalchnd.com/images/lalchnd/home/BRACELETS.webp",
  },
  {
    name: "RINGS",
    category: "rings",
    image: "https://lalchnd.com/images/lalchnd/home/ring-1.webp",
  },
  {
    name: "Kid's Wear",
    category: "bracelets",
    gender: "kids",
    image: "https://lalchnd.com/images/lalchnd/home/kids-verity.webp",
  },
  {
    name: "GIFT IDEAS",
    category: "coins",
    image: "https://lalchnd.com/images/lalchnd/home/gift.webp",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    setSelectedCategory,
    setSelectedMetal,
    setSelectedOccasion,
    scrollToProducts,
    setIsAppointmentOpen,
    setIsVideoCallOpen,
  } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleCta = () => {
    if (slide.category) setSelectedCategory(slide.category);
    if (slide.metal) setSelectedMetal(slide.metal);
    scrollToProducts();
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* 1. CINEMATIC HERO SLIDER */}
      <div className="relative h-[560px] sm:h-[620px] lg:h-[700px] w-full bg-[#0D0A07] overflow-hidden">
        {HERO_SLIDES.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Ultra 8K Background Image with smooth subtle Ken Burns zoom */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[12000ms] ease-out ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* Cinematic Gradient Vignette (protects text while showcasing 8K jewellery) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-6 lg:px-12 flex flex-col justify-center text-white">
              <AnimatePresence mode="wait">
                {index === currentSlide && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-xl space-y-4 sm:space-y-6"
                  >
                    {/* Tag */}
                    <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-[#C5A059]/50 px-4 py-1.5 rounded-full text-xs font-semibold text-[#F5E8CB] shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-[#DFBA73]" />
                      <span>{item.tag}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F5] leading-tight drop-shadow-md">
                      {item.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base text-stone-200 font-sans leading-relaxed max-w-lg drop-shadow-sm">
                      {item.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCta}
                        className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-bold text-xs sm:text-sm tracking-wider uppercase hover:shadow-xl hover:shadow-[#C5A059]/40 transition-shadow flex items-center space-x-2 shadow-lg"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (item.id === 1) {
                            const ratesEl = document.getElementById("rates");
                            if (ratesEl) ratesEl.scrollIntoView({ behavior: "smooth" });
                            else setIsAppointmentOpen(true);
                          } else if (item.id === 2) {
                            const partnerEl = document.getElementById("wholesale-partner-section");
                            if (partnerEl) partnerEl.scrollIntoView({ behavior: "smooth" });
                            else setIsAppointmentOpen(true);
                          } else {
                            setIsAppointmentOpen(true);
                          }
                        }}
                        className="px-6 sm:px-7 py-3.5 rounded-full border border-white/60 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white/15 transition-all backdrop-blur-md shadow-md"
                      >
                        {item.secondaryCta}
                      </motion.button>
                    </div>

                    {/* Hallmark Trust Badge */}
                    <div className="pt-4 flex items-center flex-wrap gap-y-1 space-x-3 sm:space-x-4 text-[11px] text-[#DFBA73]">
                      <div className="flex items-center space-x-1.5">
                        <Shield className="w-4 h-4 text-[#DFBA73]" />
                        <span>100% BIS Hallmarked 916</span>
                      </div>
                      <span className="text-stone-400">•</span>
                      <span>Instant Cash for Gold</span>
                      <span className="text-stone-400">•</span>
                      <span>Direct Wholesale Pricing</span>
                      <span className="text-stone-400">•</span>
                      <span>Zero Hidden Deductions</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-[#8F6D2C] text-white border border-white/20 transition-all backdrop-blur-xs"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-[#8F6D2C] text-white border border-white/20 transition-all backdrop-blur-xs"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-[#DFBA73]" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. EXCEEDING EXPECTATIONS - EXACT LALCHND STYLE */}
      <div className="bg-white py-16 sm:py-20 border-b border-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <MotionFadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#093B2A] tracking-tight flex items-center justify-center flex-wrap">
                <span>Exceeding</span>
                <span className="font-script text-[#E2A62C] font-normal text-4xl sm:text-6xl lg:text-7xl ml-3">
                  Expectations
                </span>
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-3.5 tracking-wide max-w-xl mx-auto font-sans">
                Yashraj Jewellery is not just about ornaments. It&apos;s about making a statement.
              </p>
            </MotionFadeIn>
          </div>

          <MotionStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-8 justify-items-center" stagger={0.08}>
            {QUICK_CATEGORIES.map((cat, idx) => (
              <MotionStaggerItem key={idx}>
                <button
                  onClick={() => {
                    if (cat.category) setSelectedCategory(cat.category);
                    if ((cat as any).gender) setSelectedOccasion("all");
                    scrollToProducts();
                  }}
                  className="group flex flex-col items-center text-center cursor-pointer focus:outline-hidden w-full max-w-[190px]"
                >
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden shadow-md border-2 border-stone-200/60 group-hover:border-[#DFBA73] transition-all duration-300 transform group-hover:scale-105 bg-white">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  <h4 className="mt-4 text-xs sm:text-sm font-serif font-semibold tracking-[0.16em] text-[#093B2A] uppercase group-hover:text-[#8F6D2C] transition-colors">
                    {cat.name}
                  </h4>
                </button>
              </MotionStaggerItem>
            ))}
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
