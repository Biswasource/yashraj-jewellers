"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  },
  {
    id: 2,
    tag: "Direct Gold Wholesaler • Minimal Price & Making Charges",
    title: "Direct Gold Wholesaler at Lowest Wholesale Prices",
    subtitle:
      "Buy certified 22K & 24K gold jewellery directly from the wholesaler. Minimal making charges, zero middleman margins, and pure BIS 916 hallmarked chains, rings, earrings, and bracelets.",
    cta: "Explore Wholesale Jewellery",
    secondaryCta: "Wholesale Partner Enquiry",
    image: "/images/hero/slide-temple-polki.jpg",
  },
  {
    id: 3,
    tag: "Certified Diamonds & 22K Gold • Since 1982",
    title: "Bracelets, Rings, Earrings & Solid Gold Chains",
    subtitle:
      "From sparkling diamond solitaires and tennis bracelets to royal jhumka earrings and solid gold chains. Unbeatable wholesale pricing and guaranteed lifetime exchange.",
    cta: "Explore Fine Jewellery",
    secondaryCta: "View Trending Designs",
    image: "/images/hero/slide-solitaire-diamond.jpg",
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
  },
];

const QUICK_CATEGORIES = [
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
    name: "EARRINGS",
    category: "earrings",
    image: "https://lalchnd.com/images/lalchnd/home/earrings.webp",
  },
  {
    name: "GOLD CHAIN",
    category: "chains",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const {
    setSelectedCategory,
    setSelectedMetal,
    setSelectedOccasion,
    setIsAppointmentOpen,
    setIsVideoCallOpen,
  } = useStore();

  // Auto-play timer that pauses on hover or touch drag
  useEffect(() => {
    if (isPaused || isSwiping) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isSwiping]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setDragOffset(0);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null || !isSwiping) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX;
    const diffY = currentY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (
        (currentSlide === 0 && diffX > 0) ||
        (currentSlide === HERO_SLIDES.length - 1 && diffX < 0)
      ) {
        setDragOffset(diffX * 0.3);
      } else {
        setDragOffset(diffX);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
    setIsSwiping(false);
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const handleCta = () => {
    setSelectedCategory("all");
    setSelectedMetal("all");
    setSelectedOccasion("all");
    router.push("/products");
  };

  const handleSecondaryCta = (slideId: number) => {
    if (slideId === 2) {
      const msg = encodeURIComponent(
        "Namaste Yashraj Jewellers! I am interested in your wholesale jewellery collections, minimal pricing, and catalogue for my retail business."
      );
      window.open(`https://wa.me/917008343796?text=${msg}`, "_blank");
    } else if (slideId === 1) {
      const msg = encodeURIComponent(
        "Namaste Yashraj Jewellers! I would like to enquire about today's live gold rate and instant cash valuation for selling my gold."
      );
      window.open(`https://wa.me/917008343796?text=${msg}`, "_blank");
    } else if (slideId === 4) {
      const msg = encodeURIComponent(
        "Namaste Yashraj Jewellers! I want to enquire about exchanging my old gold for new jewellery and computerized purity valuation."
      );
      window.open(`https://wa.me/917008343796?text=${msg}`, "_blank");
    } else {
      const msg = encodeURIComponent(
        "Namaste Yashraj Jewellers! I would like to enquire about booking a showroom visit and viewing your luxury jewellery collections."
      );
      window.open(`https://wa.me/917008343796?text=${msg}`, "_blank");
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* 1. CINEMATIC HERO SLIDER - MAJESTIC RESPONSIVE HEIGHT FOR BIG DESKTOP */}
      <div
        className="relative h-[520px] sm:h-[580px] md:h-[650px] lg:h-[720px] xl:h-[800px] 2xl:h-[870px] w-full bg-[#0D0A07] overflow-hidden select-none touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Continuous Horizontal Sliding Track */}
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
            transition: isSwiping ? "none" : "transform 750ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {HERO_SLIDES.map((item, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={item.id}
                className="relative w-full min-w-full h-full shrink-0 overflow-hidden"
              >
                {/* Ultra 8K Background Image with smooth Ken Burns zoom on active slide */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[12000ms] ease-out ${
                    isActive ? "scale-108" : "scale-100"
                  }`}
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Cinematic Vignette Gradients for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />

                {/* Slide Content with Responsive Typography for Big Desktop */}
                <div className="relative z-20 max-w-7xl 2xl:max-w-[1550px] mx-auto h-full px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col justify-center text-white">
                  <div className="max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-3.5 sm:space-y-4.5 lg:space-y-6">
                    {/* Tag Badge */}
                    <div
                      className={`inline-flex items-center space-x-2 bg-black/60 backdrop-blur-md border border-[#C5A059]/40 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-cinzel tracking-[0.16em] uppercase text-[#F5E8CB] shadow-md transition-all duration-700 delay-100 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#DFBA73]" />
                      <span>{item.tag}</span>
                    </div>

                    {/* Title */}
                    <h2
                      className={`text-2xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[58px] 2xl:text-[66px] font-cormorant font-semibold text-[#FFFDF9] leading-[1.1] tracking-[-0.01em] drop-shadow-lg transition-all duration-700 delay-200 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    >
                      {item.title}
                    </h2>

                    {/* Subtitle */}
                    <p
                      className={`text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-stone-200/95 font-sans font-light leading-relaxed max-w-lg lg:max-w-xl xl:max-w-2xl drop-shadow-sm line-clamp-3 sm:line-clamp-none transition-all duration-700 delay-300 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    >
                      {item.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div
                      className={`pt-1 sm:pt-2 flex flex-wrap gap-2.5 sm:gap-4 transition-all duration-700 delay-400 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                      }`}
                    >
                      <button
                        onClick={handleCta}
                        className="px-5 sm:px-8 py-2.5 sm:py-3.5 xl:py-4 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#9E7B35] text-[#1A1208] font-cinzel font-bold text-xs sm:text-sm tracking-[0.12em] uppercase hover:shadow-2xl hover:shadow-[#C5A059]/50 hover:brightness-105 transition-all flex items-center space-x-2.5 shadow-lg active:scale-95 cursor-pointer"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleSecondaryCta(item.id)}
                        className="px-5 sm:px-7 py-2.5 sm:py-3.5 xl:py-4 rounded-full border border-white/70 text-white font-cinzel font-semibold text-xs sm:text-sm tracking-[0.12em] uppercase hover:bg-white/20 transition-all backdrop-blur-md shadow-md active:scale-95 cursor-pointer"
                      >
                        {item.secondaryCta}
                      </button>
                    </div>

                    {/* Hallmark Trust Badge */}
                    <div
                      className={`pt-1 sm:pt-2 flex items-center flex-wrap gap-y-1.5 space-x-2.5 sm:space-x-4 text-[10px] sm:text-xs xl:text-sm text-[#DFBA73] transition-all duration-700 delay-500 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 font-semibold">
                        <Shield className="w-3.5 h-3.5 text-[#DFBA73]" />
                        <span>100% BIS Hallmarked 916</span>
                      </div>
                      <span className="text-stone-400">•</span>
                      <span>Instant Cash for Gold</span>
                      <span className="text-stone-400">•</span>
                      <span>Direct Wholesale Pricing</span>
                      <span className="text-stone-400">•</span>
                      <span>Zero Hidden Deductions</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-[#8F6D2C] text-white border border-white/25 hover:border-[#DFBA73] transition-all backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-black/45 hover:bg-[#8F6D2C] text-white border border-white/25 hover:border-[#DFBA73] transition-all backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Bottom Bar: Slide Indicators & Numerical Counter */}
        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3 bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                i === currentSlide
                  ? "w-8 sm:w-10 bg-gradient-to-r from-[#DFBA73] to-[#C5A059] shadow-sm shadow-[#DFBA73]/50"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <span className="text-[10px] sm:text-xs font-mono tracking-wider text-[#DFBA73] pl-2 border-l border-white/25 select-none font-semibold">
            0{currentSlide + 1} / 0{HERO_SLIDES.length}
          </span>
        </div>
      </div>

      {/* 2. EXCEEDING EXPECTATIONS - EXACT LALCHND STYLE */}
      <div className="bg-white py-16 sm:py-20 border-b border-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <MotionFadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-cormorant font-semibold text-[#093B2A] tracking-tight flex items-center justify-center flex-wrap">
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

          <MotionStagger className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 justify-items-center max-w-5xl mx-auto" stagger={0.08}>
            {QUICK_CATEGORIES.map((cat, idx) => (
              <MotionStaggerItem key={idx}>
                <button
                  onClick={() => {
                    if (cat.category) {
                      setSelectedCategory(cat.category);
                      router.push(`/products?category=${cat.category}`);
                    } else {
                      router.push("/products");
                    }
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
